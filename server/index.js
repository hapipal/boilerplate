'use strict';

const Hoek = require('hoek');
const Glue = require('glue');
const Labbable = require('labbable');
const Manifest = require('./manifest');

const labbable = module.exports = new Labbable();

Glue.compose(Manifest, { relativeTo: __dirname }, (err, server) => {

    Hoek.assert(!err, err);

    // Pass server along to labbable
    labbable.using(server);

    server.initialize((err) => {

        Hoek.assert(!err, err);

        // No need to start server if this is being required (i.e. for testing)
        if (module.parent) {
            return;
        }

        server.start((err) => {

            Hoek.assert(!err, err);

            console.log(`Server started at ${server.info.uri}`);
        });
    });
});
