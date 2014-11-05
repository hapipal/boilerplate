var Path = require('path');
var Hapi = require('hapi');
var Config = require('./config');


Config.server.boilerplateApi.uri = (Config.server.boilerplateApi.tls ? 'https://' : 'http://') + Config.server.boilerplateApi.host + ':' + Config.server.boilerplateApi.port;


var manifest = {
    
    pack: {
        app: {
            config: Config,
        }
    },
    
    servers: [
        {
            host: Config.server.boilerplateApi.host,
            port: Config.server.boilerplateApi.port,
            options: {
                labels: 'boilerplate-api',
                cors: true
            }
        },
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

// If this is being required, return the manifest.  Otherwise, start the pack.
if (!module.parent) {
    Hapi.Pack.compose(manifest, { relativeTo: Path.join(__dirname, 'node_modules') }, function (err, pack) {
        
        pack.start();
    }); 
}

