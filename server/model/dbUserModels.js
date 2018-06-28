import pool from './db';

const bcrypt = require('bcrypt');

const genID = () => `U_${Math.floor(Math.random() * 9000000000) + 1000000000}`;

const user = {
  addUser: (object) => {
    let success = false;
    pool.connect((err, cl) => {
      if (err) {
        console.log(err);
      }
      bcrypt.hash(object.Password, 10)
        .then((hash) => {
          cl.query(`INSERT INTO public."Users" ("ID", "FirstName", "LastName", "Sex", "DOB", "MobileNumber", "EmailAddress", "Password", "RidesOffered", "RidesTaken", "Friends") VALUES ('${genID()}', '${object.FirstName}', '${object.LastName}', '${object.Sex}', '${object.DOB}', ${object.PhoneNumber}, '${object.EmailAddress}', '${hash}', 0, 0, 0);`)
            .then((res, error) => {
              if (error) {
                console.log(error);
              } else {
                success = true;
              }
            });
        });
    });
    return success;
  },
};

export default user;
