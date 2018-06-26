import Ride from './classes/ride';
import users from './usersmodel';

const rides = [
  new Ride(users[0].userID, 'Ikeja', 'Musin', '9:30AM', true, 3, 'Ikeja to Mushin via Oshodi'),
  new Ride(users[1].userID, 'Lagos', 'Enugu', '12:00PM', false, 2, 'Non-stop to enugu'),
  new Ride(users[2].userID, 'Ikorodu', 'Idumota', '1:45pm', false, 3),
  new Ride(users[3].userID, 'Magodo', 'Iyana-Ipaja', '3:00PM', true, 3, 'Going via Ogba and Agege'),
];

export default rides;
