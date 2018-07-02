const controller = {
  get: (req, res) => {
    res.send('Server is running, kindly use the endpoints. /api/v1/rides, /api/v1/rides/:rideId, /api/v1/rides, /api/v1/rides/:rideId/requests');
  },
};

export default controller;
