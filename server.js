'use strict';

const Path = require('path');
const Glue = require('glue');
const Config = require('./config');

const manifest = {

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
                register: './dogwater',
                options: Config.dogwater
            }
        },
        {
            plugin: {
                register: './poop',
                options: Config.poop
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

module.exports = manifest;

// If this is being required, return the manifest.  Otherwise, start the server.
if (!module.parent) {

    Glue.compose(manifest, { relativeTo: Path.join(__dirname, 'node_modules') }, (err, server) => {

        if (err) {
            throw err;
        }
        server.start( (err) => {

            if (err) {
                throw (err);
            }
            console.log(`Boilerplate API Started at ${server.info.uri}`);
        });
    });

}
