'use strict';

const Config = require('../../server/config');

module.exports = function (server, options) {

    return [
        {
            plugins: [
                {
                    register: require('../../server/boilerplate-swagger')
                },
                {
                    register: require('dogwater'),
                    options: Config.dogwater
                },
                {
                    register: require('poop'),
                    options: Config.poop
                },
                {
                    register: require('bedwetter'),
                    options: Config.bedwetter
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

};
