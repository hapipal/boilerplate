'use strict';

const Config = require('./config');

// Glue manifest
module.exports = {

    server: {
        app: {
            config: Config
        }
    },

    connections: [
        {
            host: Config.server.boilerplateApi.host,
            port: Config.server.boilerplateApi.port,
            labels: 'boilerplate-api',
            routes: {
                cors: true
            }
        }
    ],
    registrations: [
        {
            plugin: {
                register: 'dogwater',
                options: Config.dogwater
            }
        },
        {
            plugin: {
                register: 'poop',
                options: Config.poop
            }
        },
        {
            plugin: {
                register: 'bassmaster',
                options: {
                    batchEndpoint: '/',
                    tags: ['bassmaster']
                }
            }
        },
        {
            plugin: {
                register: './boilerplate_swagger'
            }
        },
        {
            plugin: {
                register: '../lib'
            },
            options: {
                select: 'boilerplate-api'
            }
        }
    ]

};
