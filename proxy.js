const ProxyChain = require("proxy-chain");
const fs = require("fs");

const ALLOWED_HOSTS = ["nexmotion.co.kr"];

const server = new ProxyChain.Server({
  port: 8443,

  prepareRequestFunction: ({ request }) => {
    const formatter = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const now = formatter.format(new Date());

    try {
      let host;

      if (request.url.startsWith("http")) {
        const url = new URL(request.url);
        host = url.hostname;
      } else {
        host = request.url.split(":")[0];
      }

      if (!ALLOWED_HOSTS.includes(host)) {
        console.log(`[${now}] BLOCKED: ${request.url}`);
        return {
          requestAuthentication: true,
        };
      }

      console.log(`[${now}] Proxying request to: ${request.url}`);
    } catch (err) {
      console.log(`[${now}] INVALID URL: ${request.url}`);
      return { requestAuthentication: true };
    }

    return {};
  },
});

server.listen(() => {
  console.log("Proxy running on port 8443");
});
