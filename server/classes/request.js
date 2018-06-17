export default class Request {

  /**
   * Create a new instance of a ride
   *
   * @param {string} rideID The ride ID
   * @param {string} userID The ID of the rider
   * @param {string} destination The exact destination of the rider
   */
  constructor(rideID, userID, destination) {
    this.rideID = rideID;
    this.requesterID = userID;
    this.destination = destination;
  }
}
