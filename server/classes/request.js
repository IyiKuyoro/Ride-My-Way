export default class Request {
  constructor(userID, destination) {
    this.requesterID = userID;
    this.destination = destination;
    this.status = 'pending';
  }
}
