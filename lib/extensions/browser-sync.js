'use strict';

const ChildProcess = require('child_process');
const BrowserSync = require('browser-sync');

module.exports = [
    {
        type: 'onPostStart',
        method: (server, next) => {

            if (!server.realm.pluginOptions.developmentMode) {
                return next();
            }

            const bs = server.app.bs = BrowserSync.create();
            const base = server.realm.settings.files.relativeTo;
            const run = (cmd) => ChildProcess.spawn('npm', ['run', cmd], { stdio: 'inherit' });

            bs.watch(`${base}/public/**/*.scss`).on('change', () => run('prebuild:css'));
            bs.watch([`${base}/public/**/*.js`, '!**/*.build.*']).on('change', () => run('prebuild:js'));

            bs.watch(`${base}/templates/**/*`).on('change', bs.reload);
            bs.watch(`${base}/public/**/*.{build.js,css}`).on('change', bs.reload);

            return bs.init({ proxy: server.info.uri }, next);
        }
    },
    {
        type: 'onPreStop',
        method: (server, next) => {

            if (!server.realm.pluginOptions.developmentMode) {
                return next();
            }

            server.app.bs.exit();

            return next();
        }
    }
];
