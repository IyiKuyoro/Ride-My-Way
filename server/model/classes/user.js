export default class User {
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
  constructor(userID, firstName, lastName, sex, dateOfBirth, mobileNumber, email) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.sex = sex;
    this.dateOfBirth = dateOfBirth;
    this.mobileNumber = mobileNumber;
    this.email = email;
  }
}
