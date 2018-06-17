export default class User {
  constructor(userID, origin, destination, time, stops, avaSpace, description) {
    this.rideID = () => `R_ ${Math.random().toString(36).substr(2, 9)}`;
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
