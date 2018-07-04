import dotenv from 'dotenv';
import client from '../model/db';

dotenv.config();

const controller = {
  getRides: (req, res) => {
    try {
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
            data: {
              rides: result.rows
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
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  postRideRequest: (req, res) => {
    try {
      const sqlSelect = `SELECT "driverId" FROM public."Rides" Where "id" = '${req.params.rideId}'`;
      client.query(sqlSelect, (er, re) => {
        if (er || re.rowCount === 0) {
          res.status(404).json({
            status: 'fail',
            message: 'cannot find the specified ride'
          });
        } else {
          const sqlInsert = 'INSERT INTO public."Requests" ("rideId", "requesterId", "status", "requesterName", "mobileNumber", "driverId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
          const values = [req.params.rideId, req.body.requesterId, 'pending', `${req.body.firstName} ${req.body.lastName}`, req.body.mobileNumber, re.rows[0].driverId];
          client.query(sqlInsert, values, (error, result) => {
            if (error || result.rowCount === 0) {
              res.status(404).json({
                status: 'fail',
                message: 'Some information provided is not of the right type'
              });
            } else {
              const sqlUpdate = `UPDATE public."Rides" SET "requests" = array_cat("requests", '{${result.rows[0].id}}') Where "id" = '${req.params.rideId}';`;
              client.query(sqlUpdate, (inError) => {
                if (inError) {
                  res.status(400).json({
                    status: 'fail',
                    message: 'Some information provided is not of the right type'
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
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  getRequests: (req, res) => {
    try {
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
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  putResponse: (req, res) => {
    try {
      const sql = `UPDATE public."Requests" SET "status" = '${req.body.newStatus}' Where "id" = '${req.params.requestId}';`;
      client.query(sql, (error, result) => {
        if (error || result.rowCount === 0) {
          res.status(400).json({
            status: 'fail',
            message: 'Cannot put response'
          });
        } else {
          res.status(200).json({
            status: 'success',
            message: 'Response recorded'
          });
        }
      });
    } catch (e) {
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  }
};

export default controller;
