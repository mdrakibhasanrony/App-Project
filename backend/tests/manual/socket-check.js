require('dotenv').config();
const { io } = require('socket.io-client');
const jwt = require('jsonwebtoken');

const url = 'http://127.0.0.1:4000';

// Test 1: Token chhara connect
const noToken = io(url, { auth: {}, reconnection: false });
noToken.on('connect_error', (err) => {
  console.log('Token chhara ->', err.message);
  noToken.close();
});

// Test 2: Valid token (database lagbe na, shudhu token check hoy)
const token = jwt.sign(
  { sub: 'test-user-1', role: 'DOCTOR', facilityId: 'facility-1' },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '5m' }
);
const good = io(url, { auth: { token }, reconnection: false });
good.on('connected', (data) => {
  console.log('Valid token ->', data);
  good.close();
});
good.on('connect_error', (err) => {
  console.log('Valid token error ->', err.message);
});