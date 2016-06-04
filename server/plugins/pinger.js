'use strict';

const Package = require('../../package.json');

module.exports = (server, options, next) => {

    // Pinger
    server.route({
        method: 'get',
        path: '/',
        config: {
            tags: ['api'],
            description: 'Pinger',
            handler: function (request, reply) {

                return reply({
                    ping: 'pong',
                    version: Package.version
                });
            }
        }
    });

    next();
};

module.exports.attributes = {
    name: 'app-pinger'
};
