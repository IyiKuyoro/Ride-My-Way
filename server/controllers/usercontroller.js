import users from '../model/dbUserModels';

const validEmail = (email) => {
  if (email) {
    return true;
  }
  return false;
};

const controller = {
  postSuccess: false,
  postSignUp: (req, res) => {
    if (validEmail(req.body.EmailAddress)) {
      users.addUser(req.body);
      console.log(controller.postSuccess);
    }

    if (controller.postSuccess) {
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
