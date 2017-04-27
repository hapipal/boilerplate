'use strict';

const Dotenv = require('dotenv');
const Hoek = require('hoek');
const Confidence = require('confidence');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        debug: {
            $filter: 'NODE_ENV',
            development: {
                log: ['error', 'implementation', 'internal'],
                request: ['error', 'implementation', 'internal']
            }
        }
    },
    connections: [
        {
            host: '0.0.0.0',
            port: Hoek.reach(process.env, 'PORT', { default: 3000 })
        }
    ],
    registrations: [
        {
            plugin: './plugins/swagger'
        },
        {
            plugin: {
                register: '../lib', // Main plugin
                options: {}
            }
        }
    ]
});
