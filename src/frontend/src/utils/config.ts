const LOCAL_API_PORT = '8800';
const hostname = window.location.hostname;
const port = hostname === 'localhost' ? LOCAL_API_PORT : window.location.port;
const protocol = window.location.protocol;

export const apiBaseUri = `${protocol}://${hostname}:${port}/api`;
