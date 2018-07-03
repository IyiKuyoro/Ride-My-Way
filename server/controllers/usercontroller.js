import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import helper from '../helpers/helper';
import client from '../model/db';

dotenv.config();

const controller = {
  postSignUp: (req, res) => {
    helper.validEmail(req.body.EmailAddress, (valid) => {
      try {
        if (valid) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            }
            bcrypt.hash(req.body.Password, salt, (error, hash) => {
              if (err) {
                throw err;
              }
              const text = 'INSERT INTO public."Users" ("firstName", "lastName", "sex", "dob", "mobileNumber", "emailAddress", "password", "ridesTaken", "ridesOffered", "friends", "accountStatus") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
              const values = [req.body.firstName, req.body.lastName, req.body.sex, req.body.dob, req.body.phoneNumber, req.body.emailAddress, hash, 0, 0, 0, 'Active'];
              client.query(text, values, (error1, result) => {
                if (error1) {
                  res.status(400);
                  res.json({
                    status: 'fail',
                    message: 'Could not add user to database',
                  });
                } else {
                  const token = jwt.sign(
                    {
                      userId: result.rows[0].ID,
                    },
                    process.env.KEY,
                    {
                      expiresIn: '1h',
                    }
                  );
                  const response = {
                    status: 'Success',
                    data: {
                      token,
                      iD: result.rows[0].id,
                      firstName: result.rows[0].firstName,
                      lastName: result.rows[0].lastName,
                      mobileNumber: result.rows[0].mobileNumber,
                      emailAddress: result.rows[0].emailAddress,
                      ridesTaken: result.rows[0].ridesTaken,
                      ridesOffered: result.rows[0].ridesOffered,
                      friends: result.rows[0].friends,
                    },
                  };
                  res.json(response);
                }
              });
            });
          });
        } else {
          res.status(400);
          res.json({
            status: 'fail',
            message: 'Could not add user to database',
          });
        }
      } catch (e) {
        res.status(400);
        res.json({
          status: 'fail',
          message: 'Could not add user to database',
        });
      }
    });
  },
  postLogIn: (req, res) => {
    try {
      const sql = `SELECT * FROM public."Users" WHERE "emailAddress" = '${req.body.emailAddress}'`;
      client.query(sql, (err, result) => {
        if (err || result.rows.length === 0) {
          res.status(401);
          res.json({
            status: 'fail',
            message: 'Unauthorized',
          });
        } else {
          bcrypt.compare(req.body.password, result.rows[0].password, (error, same) => {
            if (error || !same) {
              res.status(401);
              res.json({
                status: 'fail',
                message: 'Unauthorized',
              });
            } else {
              const token = jwt.sign(
                {
                  userId: result.rows[0].id,
                },
                process.env.KEY,
                {
                  expiresIn: '1h',
                }
              );
              const response = {
                status: 'success',
                data: {
                  token,
                  iD: result.rows[0].id,
                  firstName: result.rows[0].firstName,
                  lastName: result.rows[0].lastName,
                  mobileNumber: result.rows[0].mobileNumber,
                  emailAddress: result.rows[0].emailAddress,
                  ridesTaken: result.rows[0].ridesTaken,
                  ridesOffered: result.rows[0].ridesOffered,
                  friends: result.rows[0].friends,
                }
              };
              res.json(response);
            }
          });
        }
      });
    } catch (e) {
      res.status(401);
      res.json({
        status: 'fail',
        message: 'Unauthorized',
      });
    }
  },
  postRide: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (er) => {
        if (er) {
          res.status(403);
          res.json({
            message: 'Forbiden',
          });
        } else {
          const sqlInsert = 'INSERT INTO public."Rides" ("dirverID", "origin", "destination", "time", "allowStops", "avaliableSpace", "description") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
          const values = [req.body.driverID, req.body.origin, req.body.destination, req.body.time, req.body.allowStops, req.body.avaliableSpace, req.body.description];
          client.query(sqlInsert, values, (error) => {
            if (error) {
              res.status(500);
              res.json({
                status: 'fail',
                message: 'Cannot save ride offer'
              });
            } else {
              const sqlSelect = `SELECT * FROM public."rides" Where "driverId" = ${req.body.driverId};`;
              client.query(sqlSelect, (err, re) => {
                const sqlUpdate = `UPDATE public."Users" SET "ridesOffered" = ${re.rowCount} Where "ID" = '${req.body.driverId}';`;
                client.query(sqlUpdate, () => {
                  res.status(200);
                  res.json({
                    message: 'Ride offer saved'
                  });
                });
              });
            }
          });
        }
      });
    } catch (e) {
      res.json({
        status: 'fail',
        message: 'Cannot save ride offer',
      });
    }
  },
  deleteTestUser: (email, callback) => {
    const sql = `DELETE FROM public."Users" WHERE "emailAddress" = '${email}'`;
    client.query(sql, () => {
      callback();
    });
  },
};

export default controller;
