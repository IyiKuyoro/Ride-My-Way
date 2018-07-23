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
    let statusCode = 200;
    let errMessage = '';

    const updateError = (code, errorMessage) => {
      statusCode = code;
      errMessage += `${errorMessage}\n`;
    };

    if (!(data.firstName)) {
      updateError(400, 'firstName is a required field');
    }
    if (!(data.lastName)) {
      updateError(400, 'lastName is a required field');
    }
    if (!(data.sex)) {
      updateError(400, 'sex is a required field');
    }
    if (!(data.dob)) {
      updateError(400, 'dob is a required field');
    }
    if (!(data.phoneNumber)) {
      updateError(400, 'phoneNumber is a required field');
    }
    if (!(data.emailAddress)) {
      updateError(400, 'emailAddress is a required field');
    }
    if (!(data.password)) {
      updateError(400, 'password is a required field');
    }
    callback(statusCode, errMessage);
  },
  validSignUpDataType: (data, callback) => {
    let statusCode = 200;
    let errMessage = '';

    const updateError = (code, errorMessage) => {
      statusCode = code;
      errMessage += `${errorMessage}\n`;
    };
    // The following regex were gotten from stack over-flow accross several links
    // https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
    if (!(/^[a-zA-Z -]+$/.test(data.firstName.trim()))) {
      updateError(400, 'firstName must be a string');
    }
    if (!(/^[a-zA-Z -]+$/.test(data.lastName.trim()))) {
      updateError(400, 'lastName must be a string');
    }
    if (data.sex.trim().toLowerCase() !== 'male') {
      if (data.sex.trim().toLowerCase() !== 'female') {
        updateError(400, 'sex must be male or female');
      }
    }
    if (!(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/.test(data.dob.trim())) || data.dob.length > 10) {
      updateError(400, 'dob must be in a this format mm/dd/yyyy');
    }
    if (Number(data.dob.trim().substring(0, 2)) > 12) {
      updateError(400, 'dob month cannot be greater than 12');
    }
    if (Number(data.dob.trim().substring(3, 5)) > 31) {
      updateError(400, 'dob day cannot be greater than 31');
    }
    const curYear = new Date().getFullYear();
    if (curYear - Number(data.dob.trim().substring(6, 10)) < 18) {
      updateError(400, 'This user cannot drive yet');
    }
    if (!(data.phoneNumber.trim())) {
      updateError(400, 'phoneNumber must be a string');
    }
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(regex.test(data.emailAddress.trim()))) {
      updateError(400, 'emailAddress must be an email');
    }
    if (data.password.trim() === '' || typeof data.password !== 'string') {
      updateError(400, 'password must be a string');
    }
    callback(statusCode, errMessage);
  },
  validateLogIn: (data, callback) => {
    let statusCode = 200;
    let errMessage = '';

    const updateError = (code, errorMessage) => {
      statusCode = code;
      errMessage += `${errorMessage}\n`;
    };

    if (!(data.emailAddress)) {
      updateError(400, 'emailAddress is required');
    }
    if (!(data.password)) {
      updateError(400, 'password is required');
    }

    callback(statusCode, errMessage);
  },
  validateRidesOfferData: (data, callback) => {
    let statusCode = 200;
    let errMessage = '';

    const updateError = (code, errorMessage) => {
      statusCode = code;
      errMessage += `${errorMessage}\n`;
    };

    if (!data.origin) {
      updateError(400, 'origin is required');
    }
    if (!data.destination) {
      updateError(400, 'destination is required');
    }
    if (!data.time) {
      updateError(400, 'time is required');
    }
    if (!data.allowStops) {
      updateError(400, 'allowStops is required');
    }
    if (!data.avaliableSpace) {
      updateError(400, 'avaliableSpace is required');
    }
    if (!data.description) {
      updateError(400, 'description is required');
    }

    callback(statusCode, errMessage);
  },
  validateRidesOfferTypes: (data, callback) => {
    let statusCode = 200;
    let errMessage = '';

    const updateError = (code, errorMessage) => {
      statusCode = code;
      errMessage += `${errorMessage}\n`;
    };

    if (data.origin.trim() === '' || typeof data.origin !== 'string') {
      updateError(400, 'origin must be a string');
    }
    if (data.destination.trim() === '' || typeof data.destination !== 'string') {
      updateError(400, 'destination must be a string');
    }
    if (!(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time.trim()))) {
      updateError(400, 'time must be in the format hh:mm');
    }
    if (data.allowStops !== 'true') {
      if (data.allowStops !== 'false') {
        updateError(400, 'allowStops must be a boolean type');
      }
    }
    if (!Number(data.avaliableSpace)) {
      updateError(400, 'avaliableSpace must be a number');
    }
    if (data.description.trim() === '' || typeof data.description !== 'string') {
      updateError(400, 'description must be a string');
    }

    callback(statusCode, errMessage);
  },
  validatePutRequest: (data, callback) => {
    if (data.newStatus) {
      if (data.newStatus.trim().toLowerCase() === 'accepted' || data.newStatus.trim().toLowerCase() === 'declined') {
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
