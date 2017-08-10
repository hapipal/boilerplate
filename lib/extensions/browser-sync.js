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

            bs.watch(`${base}/templates/**/*`).on('change', bs.reload);
            bs.watch(`${base}/public/**/*.{js,css}`).on('change', bs.reload);
            bs.watch(`${base}/public/**/*.scss`).on('change', () => ChildProcess.exec('npm run prebuild:css'));

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
