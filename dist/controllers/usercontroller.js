// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import helper from '../helpers/helper';
// import client from '../model/db';

// dotenv.config();

// const genID = () => `U_${Math.floor(Math.random() * 9000000000) + 1000000000}`; //  Got this from a web source I can't remember now.
// const controller = {
//   postSignUp: (req, res) => {
//     helper.validEmail(req.body.EmailAddress, (valid) => {
//       if (valid) {
//         bcrypt.genSalt(10, (err, salt) => {
//           if (err) {
//             console.log(err);
//           }
//           bcrypt.hash(req.body.Password, salt, (error, hash) => {
//             if (err) {
//               console.log(error);
//             }
//             const text = 'INSERT INTO public."Users" ("ID", "FirstName", "LastName", "Sex", "DOB", "MobileNumber", "EmailAddress", "Password", "RidesOffered", "RidesTaken", "Friends") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';
//             const values = [genID(), req.body.FirstName, req.body.LastName, req.body.Sex, req.body.DOB, req.body.PhoneNumber, req.body.EmailAddress, hash, 0, 0, 0];
//             client.query(text, values, (error1, result) => {
//               if (error1) {
//                 res.status(400);
//                 res.json({
//                   status: 'fail',
//                   message: 'Could not add user to database',
//                 });
//               } else {
//                 const token = jwt.sign(
//                   {
//                     email: result.rows[0].EmailAddress,
//                     userId: result.rows[0].ID,
//                   },
//                   process.env.KEY,
//                   {
//                     expiresIn: '1h',
//                   }
//                 );
//                 const response = {
//                   token,
//                   status: 'Success',
//                   data: {
//                     ID: result.rows[0].ID,
//                     FirstName: result.rows[0].FirstName,
//                     LastName: result.rows[0].LastName,
//                     Sex: result.rows[0].Sex,
//                     DOB: result.rows[0].DOB,
//                     EmailAddress: result.rows[0].EmailAddress,
//                   },
//                 };
//                 res.json(response);
//               }
//             });
//           });
//         });
//       } else {
//         res.status(400);
//         res.json({
//           status: 'fail',
//           message: 'Could not add user to database',
//         });
//       }
//     });
//   },
//   deleteTestUser: (email, callback) => {
//     helper.validEmail(email, (response) => {
//       if (response) {
//         const sql = `DELETE FROM public."Users" WHERE "EmailAddress" = '${email}'`;
//         client.query(sql, () => {
//           callback();
//         });
//       } else {
//         callback();
//       }
//     });
//   },
// };

// export default controller;
"use strict";
//# sourceMappingURL=usercontroller.js.map