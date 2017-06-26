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
            plugin: {
                register: '../lib', // Main plugin
                options: {}
            }
        },
        {
            plugin: {
                register: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'sqlite3',
                            useNullAsDefault: true,         // Suggested for sqlite3
                            pool: {
                                idleTimeoutMillis: Infinity // Handles knex v0.12/0.13 misconfiguration when using sqlite3 (tgriesser/knex#1701)
                            },
                            connection: {
                                filename: ':memory:'
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            }
        }
    ]
});
