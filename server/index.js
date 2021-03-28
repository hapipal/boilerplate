'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('./manifest');

exports.deployment = async ({ start } = {}) => {

    const manifest = Manifest.get('/', process.env);
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    if (start) {
        await server.start();
        server.log(['start'], `Server started at ${server.info.uri}`);
    }

    return server;
};

if (require.main === module) {

    exports.deployment({ start: true });

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}
