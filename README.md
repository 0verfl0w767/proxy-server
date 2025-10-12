# proxy-server

## IP SSL 인증서 받기 (HTTPS 적용하려면)

`openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365`
