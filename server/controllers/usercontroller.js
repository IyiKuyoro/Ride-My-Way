import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import helper from '../helpers/helper';
import client from '../model/db';

dotenv.config();

const controller = {
  postSignUp: (req, res) => {
    helper.validEmail(req.body.emailAddress, (valid) => {
      try {
        if (valid) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            }
            bcrypt.hash(req.body.password, salt, (error, hash) => {
              if (err) {
                throw err;
              }
              const text = 'INSERT INTO public."Users" ("firstName", "lastName", "sex", "dob", "mobileNumber", "emailAddress", "password", "ridesTaken", "ridesOffered", "friends", "accountStatus") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
              const values = [req.body.firstName, req.body.lastName, req.body.sex, req.body.dob, req.body.phoneNumber, req.body.emailAddress, hash, 0, 0, 0, 'Active'];
              client.query(text, values, (error1, result) => {
                if (error1) {
                  res.status(400).json({
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
          res.status(400).json({
            status: 'fail',
            message: 'Could not add user to database',
          });
        }
      } catch (e) {
        res.status(500).json({
          status: 'fail',
          message: 'Oops, seems like something went wrong here'
        });
      }
    });
  },
  postLogIn: (req, res) => {
    try {
      const sql = `SELECT * FROM public."Users" WHERE "emailAddress" = '${req.body.emailAddress}'`;
      client.query(sql, (err, result) => {
        if (err || result.rows.length === 0) {
          res.status(401).json({
            status: 'fail',
            message: 'Wrong login details',
          });
        } else {
          bcrypt.compare(req.body.password, result.rows[0].password, (error, same) => {
            if (error || !same) {
              res.status(401).json({
                status: 'fail',
                message: 'Wrong login details',
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
      res.status(500).json({
        status: 'fail',
        message: 'Oops, seems like something went wrong here'
      });
    }
  },
  postRide: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (er) => {
        if (er) {
          res.status(401).json({
            status: 'fail',
            message: 'This token is either wrong or has expired'
          });
        } else {
          const sqlInsert = 'INSERT INTO public."Rides" ("driverId", "origin", "destination", "time", "allowStops", "avaliableSpace", "description", "requests") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
          const values = [req.body.driverId, req.body.origin, req.body.destination, req.body.time, req.body.allowStops, req.body.avaliableSpace, req.body.description, new Array()];
          client.query(sqlInsert, values, (error) => {
            if (error) {
              res.status(404).json({
                status: 'fail',
                message: 'Ride not found'
              });
            } else {
              const sqlSelect = `SELECT * FROM public."Rides" Where "driverId" = ${req.body.driverId};`;
              client.query(sqlSelect, (err, re) => {
                const sqlUpdate = `UPDATE public."Users" SET "ridesOffered" = ${re.rowCount} Where "ID" = '${req.body.driverId}';`;
                client.query(sqlUpdate, () => {
                  res.status(200).json({
                    status: 'success',
                    message: 'Ride offer saved'
                  });
                });
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
  deleteTestUser: (email, callback) => {
    const sql = `DELETE FROM public."Users" WHERE "emailAddress" = '${email}'`;
    client.query(sql, () => {
      callback();
    });
  },
};

export default controller;
