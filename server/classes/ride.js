export default class Ride {
  generateID() {
    this.rideID = `R_${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  }

  /**
   * Create a new instance of a ride
   *
   * @param {string} userID The drivers userID
   * @param {string} origin The origin of the ride
   * @param {string} destination The destination of the ride
   * @param {string} time The time of departure
   * @param {bool} stops Will the driver be making stops
   * @param {number} avaSpace The avaliable space on the ride
   * @param {string} description A description of the proposed route
   */
  constructor(userID, origin, destination, time, stops, avaSpace, description) {
    this.generateID();
    this.driverID = userID;
    this.orgin = origin;
    this.destination = destination;
    this.time = time;
    this.allowStops = stops;
    this.avaliableSpace = avaSpace;
    this.description = description;
    this.requests = [];
  }

  addRequest(request) {
    this.requests.push(request);
  }
}
