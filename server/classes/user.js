export default class User {
  constructor(firstName, lastName, sex, dateOfBirth, mobileNumber, email) {
    this.userID = () => `U_ ${Math.random().toString(36).substr(2, 9)}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.mobileNumber = mobileNumber;
    this.email = email;
  }
}
