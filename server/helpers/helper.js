import jwt from 'jsonwebtoken';
import client from '../model/db';

const helpers = {
  validEmail: (email, callback) => {
    if (email) {
      const sql = `SELECT * FROM public."Users" WHERE "EmailAddress" = '${email}';`;
      client.query(sql, (err, res) => {
        if (res.rowCount === 1) {
          callback(false);
        } else {
          callback(true);
        }
      });
    }
  },
  checkToken: (req, res, done) => {
    try {
      const decoded = jwt.verify(req.headers.jwt, process.env.KEY);
      req.userID = decoded;
      done();
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  },
};

export default helpers;
