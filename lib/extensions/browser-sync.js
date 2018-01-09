'use strict';

const ChildProcess = require('child_process');
const Util = require('util');

module.exports = [
    {
        type: 'onPostStart',
        method: async (server) => {

            if (!server.realm.pluginOptions.developmentMode) {
                return;
            }

            const bs = server.app.bs = require('browser-sync').create();
            const base = server.realm.settings.files.relativeTo;
            const run = (cmd) => ChildProcess.spawn('npm', ['run', cmd], { stdio: 'inherit' });

            bs.watch(`${base}/public/**/*.scss`).on('change', () => run('prebuild:css'));
            bs.watch([`${base}/public/**/*.js`, '!**/*.build.*']).on('change', () => run('prebuild:js'));

            bs.watch(`${base}/templates/**/*`).on('change', bs.reload);
            bs.watch(`${base}/public/**/*.{build.js,css}`).on('change', bs.reload);

            await Util.promisify(bs.init)({ proxy: server.info.uri });
        }
    },
    {
        type: 'onPreStop',
        method: (server) => {

            if (!server.realm.pluginOptions.developmentMode) {
                return;
            }

            server.app.bs.exit();
        }
    }
];
