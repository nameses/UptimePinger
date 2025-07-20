const { env } = require('process');

if (!env.ASPNETCORE_HTTPS_PORT) {
  throw new Error('ASPNETCORE_HTTPS_PORT environment variable is not set');
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://uptimepinger-server:${env.ASPNETCORE_HTTPS_PORT}` : '';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target,
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
