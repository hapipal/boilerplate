'use strict';

const Handlebars = require('handlebars');

exports.register = (server, options, next) => {

    server.register([
        {
            register: require('inert')
        },
        {
            register: require('vision')
        },
        {
            // Tag routes with "api" for use with swagger.
            register: require('hapi-swagger'),
            options: {
                enableDocumentation: false
            }
        }
    ],
    (err) => {

        if (err) {
            return next(err);
        }

        server.views({
            engines: { html: Handlebars },
            path: __dirname
        });

        // Swagger docs
        server.route({
            method: 'get',
            path: '/swagger',
            handler: { view: { template: 'swagger' } }
        });

        next();
    });

};

exports.register.attributes = {
    name: 'app-swagger'
};
