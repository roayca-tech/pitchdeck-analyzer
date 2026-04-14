const http = require('http');

const payload = JSON.stringify({
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_mock_test',
      metadata: {
        fileId: '123',
        tempFilePath: '/Users/ronaldayala/Documents/GitHub/PitchDeck Analyzer/dummy_pitch_deck.pdf',
        name: 'Test',
        email: 'test@example.com',
        company: 'Test LLC'
      }
    }
  }
});

const req = http.request({
  hostname: 'localhost',
  port: 3005,
  path: '/api/webhook',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});

req.write(payload);
req.end();
