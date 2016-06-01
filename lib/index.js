'use strict';

const Path = require('path');
const Package = require('../package.json');

exports.register = (server, options, next) => {

    server.register([
        {
            register: require('bedwetter')
        },
        {
            register: require('inert')
        },
        {
            register: require('vision')
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

        // Swagger docs
        server.route({
            method: 'GET',
            path: '/swagger',
            handler: { file: Path.normalize(__dirname + '/swagger.html') }
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
