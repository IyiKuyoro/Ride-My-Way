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
              const text = 'INSERT INTO public."Users" ("FirstName", "LastName", "Sex", "DOB", "MobileNumber", "EmailAddress", "Password", "RidesTaken", "RidesOffered", "Friends", "AccountStatus") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
              const values = [req.body.FirstName, req.body.LastName, req.body.Sex, req.body.DOB, req.body.PhoneNumber, req.body.EmailAddress, hash, 0, 0, 0, 'Active'];
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
                      iD: result.rows[0].ID,
                      firstName: result.rows[0].FirstName,
                      lastName: result.rows[0].LastName,
                      mobileNumber: result.rows[0].MobileNumber,
                      emailAddress: result.rows[0].EmailAddress,
                      ridesTaken: result.rows[0].RidesTaken,
                      ridesOffered: result.rows[0].RidesOffered,
                      friends: result.rows[0].Friends,
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
      const sql = `SELECT * FROM public."Users" WHERE "EmailAddress" = '${req.body.EmailAddress}'`;
      client.query(sql, (err, result) => {
        if (err || result.rows.length === 0) {
          res.status(401);
          res.json({
            status: 'fail',
            message: 'Unauthorized',
          });
        } else {
          bcrypt.compare(req.body.Password, result.rows[0].Password, (error, same) => {
            if (error || !same) {
              res.status(401);
              res.json({
                status: 'fail',
                message: 'Unauthorized',
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
                status: 'success',
                data: {
                  token,
                  iD: result.rows[0].ID,
                  firstName: result.rows[0].FirstName,
                  lastName: result.rows[0].LastName,
                  mobileNumber: result.rows[0].MobileNumber,
                  emailAddress: result.rows[0].EmailAddress,
                  ridesTaken: result.rows[0].RidesTaken,
                  ridesOffered: result.rows[0].RidesOffered,
                  friends: result.rows[0].Friends,
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
          const sqlInsert = 'INSERT INTO public."Rides" ("DirverID", "Origin", "Destination", "Time", "AllowStops", "AvaliableSpace", "Description") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
          const values = [req.body.driverID, req.body.origin, req.body.destination, req.body.time, req.body.allowStops, req.body.avaliableSpace, req.body.description];
          client.query(sqlInsert, values, (error) => {
            if (error) {
              res.status(500);
              res.json({
                status: 'fail',
                message: 'Cannot save ride offer'
              });
            } else {
              const sqlSelect = `SELECT * FROM public."Rides" Where "DirverID" = ${req.body.driverID};`;
              client.query(sqlSelect, (err, re) => {
                const sqlUpdate = `UPDATE public."Users" SET "RidesOffered" = ${re.rowCount} Where "ID" = '${req.body.driverID}';`;
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
    const sql = `DELETE FROM public."Users" WHERE "EmailAddress" = '${email}'`;
    client.query(sql, () => {
      callback();
    });
  },
};

export default controller;
