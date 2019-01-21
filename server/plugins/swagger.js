'use strict';

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

module.exports = {
    name: 'app-swagger',
    async register(server) {

        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: {
                    info: {
                        version: Package.version
                    }
                }
            }
        ]);
    }
};
