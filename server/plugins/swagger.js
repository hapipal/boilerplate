'use strict';

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

exports.register = (server, options, next) => {

    server.register([
        Inert,
        Vision,
        {
            register: HapiSwagger,
            options: {
                info: {
                    version: Package.version
                }
            }
        }
    ], next);
};

exports.register.attributes = {
    name: 'app-swagger'
};
