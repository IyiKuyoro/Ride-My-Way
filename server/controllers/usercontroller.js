import users from '../model/dbUserModels';

const validEmail = (email) => {
  if (email) {
    return true;
  }
  return false;
};

const controller = {
  postSignUp: (req, res) => {
    let success = false;
    if (validEmail(req.body.EmailAddress)) {
      success = users.addUser(req.body);
      console.log(success);
    }

    if (success) {
      const response = {
        token: '',
        status: 'Success',
        body: 'user added to database',
      };
      res.json(response);
    } else {
      res.json({
        status: 'Fail',
        message: 'Could not add user to database',
      });
    }
  },
};

export default controller;
