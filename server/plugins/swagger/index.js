'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package.json');

module.exports = {
    name: 'app-swagger',
    async register(server) {

        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: {
                    documentationPage: false,
                    validatorUrl: null,
                    info: {
                        version: Package.version
                    }
                }
            }
        ]);

        server.views({
            engines: { html: Handlebars },
            path: __dirname
        });

        server.route({
            method: 'get',
            path: '/documentation',
            handler: { view: { template: 'swagger' } }
        });
    }
};
