'use strict';

const Dotenv = require('dotenv');
const Confidence = require('confidence');
const Toys = require('toys');
const Schwifty = require('schwifty');

// Pull .env into process.env
Dotenv.config({ path: `${__dirname}/.env` });

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
    server: {
        host: 'localhost',
        port: {
            $env: 'PORT',
            $coerce: 'number',
            $default: 3000
        },
        debug: {
            $filter: { $env: 'NODE_ENV' },
            $default: {
                log: ['error'],
                request: ['error']
            },
            production: {
                request: ['implementation']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: '../lib', // Main plugin
                options: {}
            },
            {
                plugin: 'schwifty',
                options: {
                    $filter: 'NODE_ENV',
                    $default: {},
                    $base: {
                        migrateOnStart: true,
                        knex: {
                            client: 'sqlite3',
                            useNullAsDefault: true,     // Suggested for sqlite3
                            connection: {
                                filename: ':memory:'
                            },
                            migrations: {
                                stub: Schwifty.migrationsStubPath
                            }
                        }
                    },
                    production: {
                        migrateOnStart: false
                    }
                }
            },
            {
                plugin: {
                    $filter: { $env: 'NODE_ENV' },
                    $default: 'hpal-debug',
                    production: Toys.noop
                }
            }
        ]
    }
});
