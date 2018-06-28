import client from './db';
import controller from '../controllers/usercontroller';

const bcrypt = require('bcrypt');

const genID = () => `U_${Math.floor(Math.random() * 9000000000) + 1000000000}`;

const user = {
  addUser: (object) => {
    let result = [];

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
      }
      bcrypt.hash(object.Password, salt, (error, hash) => {
        if (err) {
          console.log(error);
        }
        const text = 'INSERT INTO public."Users" ("ID", "FirstName", "LastName", "Sex", "DOB", "MobileNumber", "EmailAddress", "Password", "RidesOffered", "RidesTaken", "Friends") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
        const values = [genID(), object.FirstName, object.LastName, object.Sex, object.DOB, object.PhoneNumber, object.EmailAddress, hash, 0, 0, 0];
        client.query(text, values, (error1, res) => {
          if (error1) {
            console.log(error1.stack);
          } else {
            controller.postSuccess = true;
            result = res.rows[0];
            console.log(result);
          }
        });
      });
    });
  },
};

export default user;
