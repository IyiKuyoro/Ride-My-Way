'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_http2.default.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Production is working\n');
}).listen(1337, '127.0.0.1');

console.log('Server is running at http://127.0.0.1:1337/');
//# sourceMappingURL=app.js.map