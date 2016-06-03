'use strict';

const Path = require('path');

module.exports = {

    product: {
        name: 'boilerplate-api'
    },

    server: {
        boilerplateApi: {
            host: '0.0.0.0',
            port: process.env.PORT || 3000
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
        models: Path.normalize(`${__dirname}/../lib/models`),
        data: {
            dir: Path.normalize(`${__dirname}/../lib`),
            pattern: 'fixtures.js'
        }
    },

    bedwetter: {
        actAsUser: true,
        userIdProperty: 'user.id',
        setOwner: false,
        requireOwner: false,
        userUrlPrefix: '/user',
        userModel: 'users',
        ownerAttr: 'owner',
        childOwnerAttr: 'owner'
    },

    poop: {
        logPath: Path.normalize(`${__dirname}/../poop.log`)
    }

};
