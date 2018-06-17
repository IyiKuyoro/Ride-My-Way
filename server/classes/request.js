export default class Request {
  constructor(rideID, userID, destination) {
    this.rideID = rideID;
    this.requesterID = userID;
    this.destination = destination;
  }
}
