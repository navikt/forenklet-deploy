const isLocalhost =  window.location.hostname === 'localhost';

export const apiBaseUri = isLocalhost ? 'http://localhost:8800/api' : '/api';
