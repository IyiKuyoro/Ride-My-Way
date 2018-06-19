export default class User {
  constructor(rideID, userID, origin, destination, time, stops, avaSpace, description) {
    this.rideID = rideID;
    this.driverID = userID;
    this.orgin = origin;
    this.destination = destination;
    this.time = time;
    this.allowStops = stops;
    this.avaliableSpace = avaSpace;
    this.description = description;
    this.ridersID = [];
  }
}
