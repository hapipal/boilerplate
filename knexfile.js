'use strict';

const Hoek = require('hoek');
const Manifest = require('./server/manifest');

// Take schwifty registration's knex option...
const knexConfig = Manifest.get('/registrations', process.env)
                           .find((r) => r.plugin.register === 'schwifty')
                           .plugin.options.knex;

// ...but specify the plugin's migrations directory.
const migrationsDirConfig = {
    migrations: {
        directory: './lib/migrations'
    }
};

module.exports = Hoek.applyToDefaults(migrationsDirConfig, knexConfig);
