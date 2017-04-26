'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Package = require('../package.json');
const LabbableServer = require('../server');

// Test shortcuts

const lab = exports.lab = Lab.script();
const before = lab.before;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Deployment server', () => {

    let server;

    before((done) => {

        LabbableServer.ready((err, srv) => {

            if (err) {
                return done(err);
            }

            server = srv;

            return done();
        });
    });

    it('has the main plugin registered.', (done) => {

        expect(server.registrations[Package.name]).to.exist();

        done();
    });
});
