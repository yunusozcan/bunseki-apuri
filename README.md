# BUNSEKI APURI
Bunseki apuri is a analytics service who measure web apps performance metrics. Like a TTFB, FCB, DOM Load, Window Load  etc.
#### Run
```bash
docker-compese up --build
```

#### Usage
```javascript
(function(b,u,n,s,e,k,i){
    e=u.getElementsByTagName('head')[0];
    k=u.createElement('script');k.async=s;k.src=n;
    e.appendChild(k);
    k.addEventListener('loaded', function() {
      Bunseki.init(b,i);
    });
})(window,document,"https://localhost.com:8082/bunseki-min.1.0.0.js", true, "API_KEY");
```

## API Tech Stack
```bash
node, express, passport, sequelize, mocha, chai, supertest
```

## Dashboard Tech Stack
```bash
react, cra, react-router-dom, chartjs, react-dates
```

## Client Library Tech Stack
```bash
gulp, browserify, jest, mocha, chai, playwright
```
