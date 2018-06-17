export default class User {
  generateID() {
    this.userID = `U_${Math.random().toString(36).substr(2, 9)}`;
  }

  constructor(firstName, lastName, sex, dateOfBirth, mobileNumber, email) {
    this.generateID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.mobileNumber = mobileNumber;
    this.email = email;
  }
}
