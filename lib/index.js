'use strict';

const Package = require('../package.json');
const HauteCouture = require('haute-couture');
const Hoek = require('hoek');

const internals = {};
internals.passthruOn = (prop) => {

    return (filename, value) => {

        const base = {};
        base[prop] = filename;
        return Object.assign(base, value);
    };
};

exports.register = (server, options, next) => {

    const manifestExtras = {   // hapiObjection models
        place: 'objection-models',
        method: 'hapiObjection',
        list: true,
        useFilename: (filename, value) => {

            if (Array.isArray(value)) {
                return value;
            }

            return [].concat({name: filename, model: value});
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
