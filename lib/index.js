'use strict';

const Config = require('../config');
const Path = require('path');
const Package = require('../package.json');
const HauteCouture = require('haute-couture');

exports.register = (server, options, next) => {

    Config.server.instance = server;
    HauteCouture()(server, options)
    .then(() => {

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


        // Haute-Couture here

        /**
         * For example...
         * server.route(require('./routes/dogs')(server, options));
         */

        next();
    })
    .catch((err) => {

        console.log(err);
        return next(err);
    });
};

exports.register.attributes = {
    pkg: Package,
    dependencies: 'dogwater'
};
