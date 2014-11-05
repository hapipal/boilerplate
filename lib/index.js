var Path = require('path');
var Hoek = require('hoek');
var Joi = require('joi');
var Config = require('../config');

exports.register = function(plugin, options, next) {
    
    plugin.dependency('dogwater', function(plugin, _next) {
        
        plugin.register([
            
            {
                plugin: require('hapi-swagger'),
                options: {
                    basePath: Config.server.boilerplateApi.uri,
                    apiVersion: 1,
                    enableDocumentationPage: false
                }
            },
            {
                plugin: require('bedwetter'),
                // TODO: Set this up, especially user model, etc.
                options: {
                    actAsUser: true,
                    userIdProperty: 'user.id',
                    setOwner: false,
                    requireOwner: false,
                    userUrlPrefix: '/user',
                    userModel: 'users',
                    ownerAttr: 'owner',
                    childOwnerAttr: 'owner'
                }
            },
            {
                plugin: require('bassmaster'),
                options: {
                    batchEndpoint: '/',
                    tags: ['bassmaster']
                }
            }
            
        ],
        function(err) {
            
            if (err) return _next(err);
            
            // TODO: bedwetter, etc. routes go here or outside the dogwater dependency block altogether.
            
            plugin.route([
            
            // Swagger docs
            {
                method: 'GET',
                path: '/swagger',
                handler: {file: Path.normalize(__dirname + '/swagger.html')}
            }
            
            ]);
            
            return _next();
            
        });
        
    });
    
    next();
    
}

exports.register.attributes = require('../package.json');