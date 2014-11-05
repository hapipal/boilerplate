var Path = require('path');

module.exports = {
    
    product: {
        name: 'boilerplate-api'
    },
    
    server: {
        boilerplateApi: {
            host: 'localhost',
            port: 3004 // choose a new one
        }
    },
    
    dogwater: {
        connections: {
            diskDb: {
                adapter: 'disk'
            }
        },
        adapters: {
            disk: require('sails-disk')
        },
        models: Path.normalize(__dirname + '/lib/models'),
        data: {
            dir: Path.normalize(__dirname + '/lib'),
            pattern: 'fixtures.js'
        }
    },
    
    poop: {
        logPath: Path.join(__dirname, 'poop.log')
    }
    
}

