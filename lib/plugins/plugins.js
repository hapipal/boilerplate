'use strict';

const Config = require('../../config');

module.exports = [
    {
        plugins: [require('inert'), require('vision')]
    },
    {
        // Tag routes with "api" for use with swagger.
        plugins: [require('hapi-swagger')],
        options: {
            basePath: Config.server.instance.info.uri,
            apiVersion: 1,
            enableDocumentationPage: false
        }
    },
    {
        plugins: [require('bedwetter')],
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
        plugins: [require('bassmaster')],
        options: {
            batchEndpoint: '/',
            tags: ['bassmaster']
        }
    }
];
