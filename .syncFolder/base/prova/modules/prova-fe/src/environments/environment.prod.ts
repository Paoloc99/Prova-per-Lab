export const environment = {
  production: true,
  baseUrl: '${GATEWAY_URL}:${GATEWAY_PORT}',
  contextRoot: 'demo',
  authUrl: '${KK_URL}:${KK_PORT}/auth',
  clientId: 'spa',
  securityOn: true
};
