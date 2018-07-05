import client from '../model/db';

const helpers = {
  validEmail: (email, callback) => {
    if (email) {
      const sql = `SELECT * FROM public."Users" WHERE "emailAddress" = '${email}';`;
      client.query(sql, (err, res) => {
        if (res.rowCount === 1) {
          callback(false);
        } else {
          callback(true);
        }
      });
    } else {
      callback(false);
    }
  },
  validSignUp: (data) => {
    if (data.firstName || data.lastName || data.sex || data.dob
    || data.phoneNumber || data.emailAddress || data.password) {
      return true;
    }
    return false;
  }
};

export default helpers;
