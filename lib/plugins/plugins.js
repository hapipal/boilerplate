'use strict';

module.exports = function(server, options) {

    return [
        {
            plugins: [
                {
                    // Tag routes with "api" for use with swagger.
                    register: require('hapi-swagger'),
                    options: {
                        basePath: server.info.uri,
                        apiVersion: 1,
                        enableDocumentationPage: false
                    }
                },
                {
                    register: require('bedwetter'),
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
                    register: require('bassmaster'),
                    options: {
                        batchEndpoint: '/',
                        tags: ['bassmaster']
                    }
                },
                {
                    register: require('inert')
                },
                {
                    register: require('vision')
                }
            ]
        }
    ];
}
