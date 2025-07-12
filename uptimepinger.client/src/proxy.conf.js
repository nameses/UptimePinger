const { env } = require('process');

if (!env.ASPNETCORE_HTTPS_PORT || !env.ASPNETCORE_URLS) {
  throw new Error('ASPNETCORE_HTTPS_PORT or ASPNETCORE_URLS environment variable is not set');
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : '';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target,
    secure: false,
  }
]

module.exports = PROXY_CONFIG;
