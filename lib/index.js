'use strict';

const Package = require('../package.json');
const HauteCouture = require('haute-couture');

exports.register = (server, options, next) => {

    HauteCouture()(server, options, (err) => {

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

        next();
    });
};

exports.register.attributes = {
    pkg: Package,
    dependencies: 'dogwater'
};
