'use strict';

const Package = require('../package.json');
const HauteCouture = require('haute-couture')();

exports.register = (server, options, next) => {

    HauteCouture(server, options, (err) => {

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
