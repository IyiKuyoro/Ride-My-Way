import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import client from '../model/db';

dotenv.config();

const controller = {
  getRides: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err) => {
        if (err) {
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          const sql = 'SELECT * FROM public."Rides";';
          client.query(sql, (error, result) => {
            if (error || result.rowCount === 0) {
              res.status(401);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              res.status(200);
              res.json(result.rows);
            }
          });
        }
      });
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  },
  getSpecificRide: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err) => {
        if (err) {
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          const sql = `SELECT * FROM public."Rides" Where "ID" = '${req.params.rideId}';`;
          client.query(sql, (error, result) => {
            if (error || result.rowCount === 0) {
              res.status(401);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              res.status(200);
              res.json(result.rows[0]);
            }
          });
        }
      });
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  },
  postRideRequest: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err) => {
        if (err) {
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          const sqlInsert = 'INSERT INTO public."Requests" ("RideID", "RequesterID", "Status", "RequesterName", "MobileNumber") VALUES ($1, $2, $3, $4, $5) RETURNING *;';
          const values = [req.params.rideId, req.body.requesterID, 'pending', `${req.body.FirstName} ${req.body.LastName}`, req.body.MobileNumber];
          client.query(sqlInsert, values, (error, result) => {
            if (error) {
              res.status(403);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              const sqlUpdate = `UPDATE public."Rides" SET "Requests" = array_cat("Requests", '{${result.rows[0].ID}}') Where "ID" = '${req.params.rideId}';`;
              client.query(sqlUpdate, (inError) => {
                if (inError) {
                  res.status(403);
                  res.json({
                    message: 'Unauthorized'
                  });
                } else {
                  res.status(200);
                  res.json({
                    message: 'Request Sent'
                  });
                }
              });
            }
          });
        }
      });
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  },
  getRequests: (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err) => {
        if (err) {
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          const sql = `SELECT * FROM public."Requests" Where "RideID" = '${req.params.rideId}';`;
          client.query(sql, (error, result) => {
            if (error || result.rowCount === 0) {
              res.status(400);
              res.json({
                message: 'Cannot get requests'
              });
            } else {
              res.status(200);
              res.json(result);
            }
          });
        }
      });
    } catch (e) {
      res.status(500);
      res.json({
        message: 'Application error'
      });
    }
  }
};

export default controller;
