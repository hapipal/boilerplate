'use strict';

const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package.json');

exports.register = (server, options, next) => {

    server.register([
        Inert,
        Vision,
        {
            register: HapiSwagger,
            options: {
                documentationPage: false,
                validatorUrl: null,
                info: {
                    version: Package.version
                }
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

        server.route({
            method: 'get',
            path: '/documentation',
            handler: { view: { template: 'swagger' } }
        });

        return next();
    });
};

exports.register.attributes = {
    name: 'app-swagger'
};
