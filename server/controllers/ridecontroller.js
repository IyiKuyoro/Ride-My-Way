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
          const sqlInsert = 'INSERT INTO public."Requests" ("RideID", "RequesterID", "Status") VALUES ($1, $2, $3) RETURNING *;';
          const values = [req.params.rideId, req.body.requesterID, 'pending'];
          client.query(sqlInsert, values, (error, result) => {
            if (error) {
              console.log(error);
              res.status(403);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              const sqlUpdate = `UPDATE public."Rides" SET "Requests" = array_cat("Requests", '{${result.rows[0].RideID}}') Where "ID" = '${req.params.rideId}';`;
              client.query(sqlUpdate, (inError) => {
                if (inError) {
                  console.log(inError);
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
  }
};

export default controller;
