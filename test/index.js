'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const LabbableServer = require('../server');

// Test shortcuts

const lab = exports.lab = Lab.script();
const before = lab.before;
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Boilerplate API server', () => {

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

    it('has the main API plugin registered.', (done) => {

        expect(server.registrations['boilerplate-api']).to.exist();
        done();
    });
});
