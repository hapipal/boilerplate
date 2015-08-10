var Path = require('path');
var Hapi = require('hapi');
var Glue = require('glue');
var Config = require('./config');


Config.server.boilerplateApi.uri = (Config.server.boilerplateApi.tls ? 'https://' : 'http://') +
                                    Config.server.boilerplateApi.host + ':' +
                                    Config.server.boilerplateApi.port;

var manifest = {

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

    plugins: {

        // General porpoise
        './dogwater':   Config.dogwater,
        './poop':       Config.poop,

        // Server-specific
        '../lib': [{ select: 'boilerplate-api' }]

    }

};

module.exports = manifest;

// If this is being required, return the manifest.  Otherwise, start the server.
if (!module.parent) {
    Glue.compose(manifest, { relativeTo: Path.join(__dirname, 'node_modules') }, function (err, server) {

        if (err) {

            throw err;
        }

        server.start(function () {

            console.log('Started on ' + Config.server.boilerplateApi.uri);
        });
    });
}
