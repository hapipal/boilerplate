'use strict';

const Package = require('../package.json');

exports.register = (server, options, next) => {

    server.register([
        {
            register: require('bedwetter')
        }
    ],
    (err) => {

        if (err) {
            return next(err);
        }

        /**
         * For example...
         * server.route(require('./routes/dogs')(server, options));
         */

        next();
    });

};

exports.register.attributes = {
    pkg: Package,
    dependencies: 'dogwater'
};
