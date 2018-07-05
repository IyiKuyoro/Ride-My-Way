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
  validSignUp: (data, callback) => {
    if (data.firstName) {
      if (data.lastName) {
        if (data.sex) {
          if (data.dob) {
            if (data.phoneNumber) {
              if (data.emailAddress) {
                if (data.password) {
                  callback(200);
                } else {
                  callback(400, 'password is a required field');
                }
              } else {
                callback(400, 'emailAddress is a required field');
              }
            } else {
              callback(400, 'phoneNumber is a required field');
            }
          } else {
            callback(400, 'dob is a required field');
          }
        } else {
          callback(400, 'sex is a required field');
        }
      } else {
        callback(400, 'lastName is a required field');
      }
    } else {
      callback(400, 'firstName is a required field');
    }
  }
};

export default helpers;
