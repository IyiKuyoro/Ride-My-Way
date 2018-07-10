import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import client from '../model/db';
import helpers from '../helpers/helper';

dotenv.config();

const controller = {
  getRides: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          req.decoded = decoded;
          const sql = 'SELECT * FROM public."Rides";';
          client.query(sql, (error, result) => {
            if (error) {
              res.status(500);
              res.json({
                status: 'fail',
                message: 'Oops, seems like something went wrong here'
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  rides: result.rows
                }
              });
            }
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  getSpecificRide: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          req.decoded = decoded;
          const sql = `SELECT * FROM public."Rides" Where "id" = '${req.params.rideId}';`;
          client.query(sql, (error, result) => {
            if (error || result.rowCount === 0) {
              res.status(404).json({
                status: 'fail',
                message: 'Ride not found'
              });
            } else {
              res.status(200).json({
                data: {
                  ride: result.rows[0]
                }
              });
            }
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  postRide: (req, res) => {
    jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: 'fail',
          message: 'This token is either wrong or has expired'
        });
      } else {
        req.decoded = decoded;
        helpers.validateRidesOfferData(req.body, (stat, eMessage) => {
          if (stat === 200) {
            helpers.validateRidesOfferTypes(req.body, (statT, eMessageT) => {
              if (statT === 200) {
                const sqlInsert = 'INSERT INTO public."Rides" ("driverId", "origin", "destination", "time", "allowStops", "avaliableSpace", "description", "requests") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
                const values = [req.decoded.userId, req.body.origin, req.body.destination, req.body.time, req.body.allowStops, req.body.avaliableSpace, req.body.description, new Array()];
                client.query(sqlInsert, values, (error) => {
                  if (error) {
                    res.status(500).json({
                      status: 'fail',
                      message: 'Oops, could not post ride offer'
                    });
                  } else {
                    const sqlSelect = `SELECT * FROM public."Rides" Where "driverId" = ${req.decoded.userId};`;
                    client.query(sqlSelect, (err, re) => {
                      const sqlUpdate = `UPDATE public."Users" SET "ridesOffered" = ${re.rowCount} Where "ID" = '${req.decoded.userId}';`;
                      client.query(sqlUpdate, () => {
                        res.status(200).json({
                          status: 'success',
                          message: 'Ride offer saved'
                        });
                      });
                    });
                  }
                });
              } else {
                res.status(statT).json({
                  status: 'fail',
                  message: eMessageT
                });
              }
            });
          } else {
            res.status(stat).json({
              status: 'fail',
              message: eMessage
            });
          }
        });
      }
    });
  },
  postRideRequest: (req, res) => {
    jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: 'fail',
          message: 'This token is either wrong or has expired'
        });
      } else {
        req.decoded = decoded;
        const sqlSelect = `SELECT "driverId" FROM public."Rides" Where "id" = '${req.params.rideId}'`;
        client.query(sqlSelect, (er, re) => {
          if (er || re.rowCount === 0) {
            res.status(404).json({
              status: 'fail',
              message: 'cannot find the specified ride'
            });
          } else if (re.rows[0].driverId === req.decoded.userId) {
            res.status(403).json({
              status: 'fail',
              message: 'User cannot request rides they have created'
            });
          } else {
            const sqlInSelect = `SELECT * FROM public."Users" Where "id" = ${req.decoded.userId}`;
            client.query(sqlInSelect, (err, ress) => {
              if (err || ress.rowCount === 0) {
                res.status(404).json({
                  status: 'fail',
                  message: 'User not found'
                });
              } else {
                const sqlInsert = 'INSERT INTO public."Requests" ("rideId", "requesterId", "status", "requesterName", "mobileNumber", "driverId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
                const values = [req.params.rideId, ress.rows[0].id, 'pending', `${ress.rows[0].firstName} ${ress.rows[0].lastName}`, ress.rows[0].mobileNumber, re.rows[0].driverId];
                client.query(sqlInsert, values, (error, result) => {
                  if (error || result.rowCount === 0) {
                    res.status(500).json({
                      status: 'fail',
                      message: 'Oops, something seems to have broken here'
                    });
                  } else {
                    const sqlUpdate = `UPDATE public."Rides" SET "requests" = array_cat("requests", '{${result.rows[0].id}}') Where "id" = '${req.params.rideId}';`;
                    client.query(sqlUpdate, (inError) => {
                      if (inError) {
                        res.status(500).json({
                          status: 'fail',
                          message: 'Oops, something seems to have broken here'
                        });
                      } else {
                        res.status(200).json({
                          status: 'success',
                          message: 'Request Sent'
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  getRequests: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
        if (err) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          req.decoded = decoded;
          const sql = `SELECT * FROM public."Requests" Where "rideId" = '${req.params.rideId}' AND "driverId" = ${req.decoded.userId};`;
          client.query(sql, (error, result) => {
            if (error || result.rowCount === 0) {
              res.status(404).json({
                status: 'fail',
                message: 'There are no requests for this ride'
              });
            } else {
              res.status(200).json({
                status: 'success',
                data: {
                  requests: result.rows
                }
              });
            }
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  putResponse: (req, res) => {
    jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: 'fail',
          message: 'This token is either wrong or has expired'
        });
      } else {
        req.decoded = decoded;
        helpers.validatePutRequest(req.body, (stat, eMessage) => {
          if (stat === 200) {
            const sqlSelect = `SELECT * FROM public."Requests" WHERE "driverId" = ${req.decoded.userId} AND "id" = ${req.params.requestId};`;
            client.query(sqlSelect, (err, response) => {
              if (err) {
                res.stat(500).json({
                  status: 'fail',
                  message: 'Error trying to access database'
                });
              } else if (response.rowCount === 0) {
                res.status(403).json({
                  status: 'fail',
                  message: 'You are not the creator of this ride'
                });
              } else {
                const sql = `UPDATE public."Requests" SET "status" = '${req.body.newStatus}' Where "id" = '${req.params.requestId}';`;
                client.query(sql, (error, result) => {
                  if (error || result.rowCount === 0) {
                    res.status(500).json({
                      status: 'fail',
                      message: 'Could not update the database'
                    });
                  } else {
                    res.status(200).json({
                      status: 'success',
                      message: 'Response recorded'
                    });
                  }
                });
              }
            });
          } else {
            res.status(stat).json({
              status: 'fail',
              message: eMessage
            });
          }
        });
      }
    });
  }
};

export default controller;
