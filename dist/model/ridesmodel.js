'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ride = require('./classes/ride');

var _ride2 = _interopRequireDefault(_ride);

var _usersmodel = require('./usersmodel');

var _usersmodel2 = _interopRequireDefault(_usersmodel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rides = [new _ride2.default(_usersmodel2.default[0].userID, 'Ikeja', 'Musin', '9:30AM', true, 3, 'Ikeja to Mushin via Oshodi'), new _ride2.default(_usersmodel2.default[1].userID, 'Lagos', 'Enugu', '12:00PM', false, 2, 'Non-stop to enugu'), new _ride2.default(_usersmodel2.default[2].userID, 'Ikorodu', 'Idumota', '1:45pm', false, 3), new _ride2.default(_usersmodel2.default[3].userID, 'Magodo', 'Iyana-Ipaja', '3:00PM', true, 3, 'Going via Ogba and Agege')];

exports.default = rides;
//# sourceMappingURL=ridesmodel.js.map