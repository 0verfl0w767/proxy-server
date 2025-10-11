const ProxyChain = require('proxy-chain');
const fs = require('fs');

const server = new ProxyChain.Server({
  port: 8443,
  prepareRequestFunction: ({ request }) => {
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const now = formatter.format(new Date());
    console.log(`[${now}] Proxying request to: ${request.url}`);
    return {};
  },
  https: {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
});

server.listen();
