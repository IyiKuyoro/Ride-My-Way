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
  },
  validSignUpDataType: (data, callback) => {
    // The following regex were gotten from stack over-flow accross several links
    // https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
    if (/^[a-zA-Z -]+$/.test(data.firstName)) {
      if (/^[a-zA-Z -]+$/.test(data.lastName)) {
        if (/^[a-zA-Z]+$/.test(data.sex)) {
          // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
          if (/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/.test(data.dob)) {
            if (!isNaN(Number(data.phoneNumber))) {
              // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
              const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (regex.test(data.emailAddress)) {
                if (typeof data.password === 'string') {
                  callback(200);
                } else {
                  callback(400, 'password must be a string');
                }
              } else {
                callback(400, 'emailAddress must be an email');
              }
            } else {
              callback(400, 'phoneNumber must be a number');
            }
          } else {
            callback(400, 'dob must be in a this format mm/dd/yy');
          }
        } else {
          callback(400, 'sex must be a string');
        }
      } else {
        callback(400, 'lastName must be a string');
      }
    } else {
      callback(400, 'firstName must be a string');
    }
  },
  validateLogIn: (data, callback) => {
    if (data.emailAddress) {
      if (data.password) {
        callback(200);
      } else {
        callback(400, 'password is required');
      }
    } else {
      callback(400, 'emailAddress is required');
    }
  },
  validateRidesOfferData: (data, callback) => {
    if (data.origin) {
      if (data.destination) {
        if (data.time) {
          if (data.allowStops) {
            if (data.avaliableSpace) {
              if (data.description) {
                callback(200);
              } else {
                callback(400, 'description is required');
              }
            } else {
              callback(400, 'avaliableSpace is required');
            }
          } else {
            callback(400, 'allowStops is required');
          }
        } else {
          callback(400, 'time is required');
        }
      } else {
        callback(400, 'destination is required');
      }
    } else {
      callback(400, 'origin is required');
    }
  },
  validateRidesOfferTypes: (data, callback) => {
    if (typeof data.origin === 'string') {
      if (typeof data.destination === 'string') {
        if (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time)) {
          if (typeof data.allowStops === 'string') {
            if (!isNaN(data.avaliableSpace)) {
              if (typeof data.description === 'string') {
                callback(200);
              } else {
                callback(400, 'description must be a string');
              }
            } else {
              callback(400, 'avaliableSpace must be an integer');
            }
          } else {
            callback(400, 'allowStops must be a string type');
          }
        } else {
          callback(400, 'time must be in the format hh:mm');
        }
      } else {
        callback(400, 'destination must be a string');
      }
    } else {
      callback(400, 'origin must be a string');
    }
  },
  validatePutRequest: (data, callback) => {
    if (data.newStatus) {
      if (data.newStatus === 'accepted' || data.newStatus === 'declined') {
        callback(200);
      } else {
        callback(400, 'newStatus can only be "accpeted" or "declined"');
      }
    } else {
      callback(400, 'newStatus is a required field');
    }
  }
};

export default helpers;
