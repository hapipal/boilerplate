'use strict';

const Package = require('../package.json');
const HauteCouture = require('haute-couture');
const Hoek = require('hoek');

const internals = {};

exports.register = (server, options, next) => {

    const manifestExtras = {   // hapiObjection models
        place: 'objection-models',
        method: 'hapiObjection',
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
