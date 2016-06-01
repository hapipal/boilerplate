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
                // Tag routes with "api" for use with swagger.
                register: 'hapi-swagger',
                options: {
                    //basePath: server.info.uri,
                    apiVersion: 1,
                    enableDocumentationPage: false
                }
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
