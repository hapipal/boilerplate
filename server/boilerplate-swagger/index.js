'use strict';
const Path = require('path');

exports.register = (server, serverOptions, next) => {

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
                apiVersion: 1,
                enableDocumentationPage: false
            }
        }
    ],
    (err) => {

        if (err) {
            return next(err);
        }

        // Swagger docs
        server.route({
            method: 'GET',
            path: '/swagger',
            handler: { file: Path.normalize(__dirname + '/swagger.html') }
        });

        next();
    });

};

exports.register.attributes = {
    name : 'hapi-swagger-bundle'
};
