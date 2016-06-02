'use strict';

//const Path = require('path');
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

        // Pinger
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {

                reply({ ping: 'pong', version: Package.version });
            }
        });

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
