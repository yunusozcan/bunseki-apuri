# API
# Client-Side

### Usage
```javascript
(function(b,u,n,s,e,k,i){
    e=u.getElementsByTagName('head')[0];
    k=u.createElement('script');k.async=s;k.src=n;
    e.appendChild(k);
    k.addEventListener('loaded', function() {
      Bunseki.init(b,i);
    });
})(window,document,"https://localhost.com:3002/bunseki-min.1.0.0.js", true, "API_KEY");
```

# Dashboard
