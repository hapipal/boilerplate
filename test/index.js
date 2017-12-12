'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Server = require('../server');
const Package = require('../package.json');

// Test shortcuts

const { before, describe, it } = exports.lab = Lab.script();
const expect = Code.expect;

describe('Deployment', () => {

    let server;

    before(async () => {

        server = await Server.deployment();
    });

    it('has the main plugin registered.', () => {

        expect(server.registrations[Package.name]).to.exist();
    });
});
