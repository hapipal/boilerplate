'use strict';

const Package = require('../package.json');
const HauteCouture = require('haute-couture');
const Hoek = require('hoek');

const internals = {};

exports.register = (server, options, next) => {

    const manifestExtras = {   // schwifty models
        place: 'schwifty-models',
        method: 'schwifty',
        list: true,
        useFilename: (filename, value) => {

            if (Array.isArray(value)) {
                return value;
            }

            return [].concat(value);
        }
    };

    HauteCouture(null, manifestExtras)(server, options, (err) => {

        if (err) {
            return next(err);
        }

        // Custom stuff can go here!

        next();
    });
};

exports.register.attributes = {
    pkg: Package
};
