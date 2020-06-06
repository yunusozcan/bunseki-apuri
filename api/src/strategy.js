const BearerStrategy = require("passport-http-bearer");
const models = require("./models");

let strategy = new BearerStrategy(
    function(token, done) {
        models.Site.findOne({where: { uuId: token }}).then((site) => {
            if (!site || site === {}) { return done(null, false); }
            return done(null, site, { scope: 'all' });
        });
    }
);


module.exports = strategy;
