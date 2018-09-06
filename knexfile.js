'use strict';

const Path = require('path');
const Hoek = require('hoek');
const Manifest = require('./server/manifest');
const PluginConfig = require('./lib/plugins/schwifty').plugins.options;

// Take schwifty registration's knex option
// but specify the plugin's migrations directory

module.exports = Hoek.applyToDefaults(
    {
        migrations: {
            directory: Path.relative(process.cwd(), PluginConfig.migrationsDir)
        }
    },
    Manifest
        .get('/register/plugins', process.env)
        .find(({ plugin }) => plugin === 'schwifty')
        .options.knex
);
