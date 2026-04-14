const fs = require('fs');
const http = require('http');

const boundary = '--------------------------123456789012345678901234';
const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/checkout',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});

let data = `--${boundary}\r\n`;
data += 'Content-Disposition: form-data; name="file"; filename="dummy.pdf"\r\n';
data += 'Content-Type: application/pdf\r\n\r\n';
data += 'DUMMY PDF CONTENT\r\n';
data += `--${boundary}\r\n`;
data += 'Content-Disposition: form-data; name="name"\r\n\r\nTest User\r\n';
data += `--${boundary}\r\n`;
data += 'Content-Disposition: form-data; name="email"\r\n\r\ntest@test.com\r\n';
data += `--${boundary}--\r\n`;

req.write(data);
req.end();
