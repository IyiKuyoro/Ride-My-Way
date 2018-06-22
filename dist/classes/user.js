"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  _createClass(User, [{
    key: "generateID",
    value: function generateID() {
      this.userID = "U_" + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Create a new instance of a ride
     *
     * @param {string} firstName The users first name
     * @param {string} lastName The users last name
     * @param {string} sex The sex of the user
     * @param {string} dateOfBirth The date of birth of the user
     * @param {number} mobileNumber The mobile number of the user
     * @param {string} email The email address of the user
     */

  }]);

  function User(firstName, lastName, sex, dateOfBirth, mobileNumber, email) {
    _classCallCheck(this, User);

    this.generateID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.mobileNumber = mobileNumber;
    this.email = email;
  }

  return User;
}();

exports.default = User;
//# sourceMappingURL=user.js.map