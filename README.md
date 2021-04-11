<p align="center">
  <a href="https://hapipal.com"><img src="https://imgur.com/shaShr0.png" alt="hapi pal" width="200" /></a>
</p>
<h3 align="center">
  the pal boilerplate
</h3>
<p align="center">
  A friendly, proven starting place for your next hapi plugin or deployment
</p>
<p align="center">
  <a target="_blank" href="https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg">
    <img alt="Slack: hapihour/hapipal" src="https://img.shields.io/badge/slack-hapihour/hapipal-orange.svg?logo=slack&style=flat-square" />
  </a>
</p>

Lead Maintainer - [Devin Ivy](https://github.com/devinivy)

**Features**
 - Supports hapi v20+ and Node.js v12+.
 - Setup with [hpal-debug](https://github.com/hapipal/hpal-debug) hapi CLI debugging tools.
 - Provides clear, customizable hapi file and folder conventions using [haute-couture](https://github.com/hapipal/haute-couture).
 - Designed to allow you to deploy your plugin on its own or as part of a larger application.
 - Textbook integrations with Objection ORM, Swagger UI, and more via [flavors](#flavors).
 - Fully setup with a [lab](https://github.com/hapijs/lab) test suite and [eslint](https://github.com/eslint/eslint) configuration.
 - Powerful [12factor](https://12factor.net/)-oriented deployment configuration using
 [confidence](https://github.com/hapipal/confidence) and [dotenv](https://github.com/motdotla/dotenv).
 - Up-to-date versions of all dependencies.
 - Follows established hapi best practices out of the box.

## Getting Started
> If you're interested to hear about why we came together to create pal, check out our Medium article [Introducing hapi pal](https://medium.com/@hapipal/introducing-hapi-pal-550c13f30c5b).
>
> Below is a simple tutorial to create your first route.  For a more in-depth look at the pal ecosystem, database integration, etc. see [our official starting guide](https://hapipal.com/getting-started).

```sh
npm init @hapipal my-project
cd ./my-project
npm install
```

<details>
  <summary> <i>(click to expand)</i>

Perhaps you'd like to perform a manual installation without any fancy CLI tools—that's possible too!  Click [here](https://github.com/hapipal/boilerplate/generate) to create a new repository using this one as a template.  Or expand to find instructions for installation using only git.
  </summary>

```sh
git clone --depth=1 --origin=pal --branch=pal git@github.com:hapipal/boilerplate.git my-project
cd my-project
git checkout --orphan master # New branch without history
npm init
npm install
```
</details>

#### Make your first commit to init project history
```sh
git add --all
git commit -m "Initial commit"
```

### Creating your first route
Here we'll will pick-up where we left off (inside a new pal project folder with all dependencies installed) and create a route that serves a random quotation.

```sh
# hpal comes installed as a dev dependency,
# so you can invoke within your project using npx.

npx hpal make route random-quotation
# Wrote lib/routes/random-quotation.js
```

Now open the newly-created file in your favorite text editor.  You should find something like this indicating which parts of the route configuration you need to fill-in, and the signature of a route handler.
```js
// lib/routes/random-quotation.js
'use strict';

module.exports = {
    method: '',
    path: '',
    options: {
        handler: async (request, h) => {}
    }
};
```

Let's fill-in the `method` and `path` so that the route we hit is at `get /random-quotation`, and write the `handler` to serve a random quotation from a list.  Our handler doesn't need to do anything asynchronous or use the [response toolkit](https://hapi.dev/api/#response-toolkit), so the route handler's signature appears a little simpler than before.

```js
// lib/routes/random-quotation.js
'use strict';

module.exports = {
    method: 'get',
    path: '/random-quotation',
    options: {
        handler: (request) => {

            const quotations = [
                {
                    quotation: 'I would rather fish any day than go to heaven.',
                    saidBy: 'Cornelia "Fly Rod" Crosby'
                },
                {
                    quotation: 'I want a turkey nut yogurt cane!',
                    saidBy: 'Stimpy'
                },
                {
                    quotation: 'Streams make programming in node simple, elegant, and composable.',
                    saidBy: 'substack'
                }
            ];

            const randomIndex = Math.floor(Math.random() * quotations.length);

            return quotations[randomIndex];
        }
    }
};
```

Now start your server and try hitting it in-browser or over `curl`.
```sh
npm start
# Server started at http://0.0.0.0:3000
```

```sh
curl http://localhost:3000/random-quotation
# {"quotation":"I would rather fish any day than go to heaven.","saidBy":"Cornelia \"Fly Rod\" Crosby"}
```

This common practice of restarting the server and curling can be simplified by leveraging [hpal-debug](https://github.com/hapipal/hpal-debug)'s curl command, which allows you to hit a route using its name _without having a started server_!
```sh
npx hpal run debug:curl random-quotation
# { quotation: 'I want a turkey nut yogurt cane!', saidBy: 'Stimpy' }
```

**And that's it!**  Keep in mind that if you run into anything along the way that's unfamiliar to you, you can always search the hapi API documentation using `hpal`.

```sh
npx hpal docs route.options.handler
```

## Flavors

hapi pal makes it easy to use the boilerplate as a jumping-off point for several different types of projects, which we call "flavors" (:lollipop: :fries: :doughnut: :poultry_leg:).  Flavors may be mixed and matched, or skipped altogether.  Only utilize them if they'll be useful to you!

They're simple little buggers.  We've simply tagged commits that we think will contain useful code patches depending on what direction you'd like to take your project.

**NOTE** Since flavors are just tagged commits, please be aware that you may experience merge conflicts when mixing flavors together.

**Pull down the latest flavors**

If you used the `hpal` CLI to create a new project then this should already be done for you.  But you can always do it manually as well– simply pull down git tags from the `pal` remote.

```sh
git fetch pal --tags
```

**Use some flavors**
```sh
git cherry-pick flavor-one flavor-two
```

### Available flavors
#### Swagger
> `git cherry-pick swagger` [[view](https://github.com/hapipal/boilerplate/commit/swagger)]

Integrates [hapi-swagger](https://github.com/glennjones/hapi-swagger) onto the server with a suitable default configuration.  If you need to customize the swagger templates, then use hapi-swagger's [`templates` option](https://github.com/glennjones/hapi-swagger/blob/master/optionsreference.md#ui) to serve your own custom version of the [Swagger UI page templates](https://github.com/glennjones/hapi-swagger/tree/master/templates).

#### Objection ORM
> `git cherry-pick objection` [[view](https://github.com/hapipal/boilerplate/commit/objection)]

Integrates [Objection ORM](https://github.com/Vincit/objection.js) into your server and plugin using the hapi plugin [schwifty](https://github.com/hapipal/schwifty).  This is a great way to get started with a SQL-oriented plugin.  Adds a `models/` directory to your plugin where Objection models should be placed, and a `migrations/` directory where your migrations should be placed.  Configured to work with SQLite out of the box.

##### Using the knex CLI
The knex CLI is installed locally, and a [knexfile](http://knexjs.org/#knexfile) is added to the root of your project so that the connection info is available to it.  To use the CLI, you may run it using npx.

For example, to create a new migration:
```
npx knex migrate:make my-first-migration
```

#### Deployment
> `git cherry-pick deployment` [[view](https://github.com/hapipal/boilerplate/commit/deployment)]

By default all deployment-oriented dependencies are placed in package.json's `devDependencies`.  This flavor pulls all the default deployment dependencies up into `dependencies`.  This is useful when you want to use pal primarily as a deployment rather than a harness to author an application plugin.  Note that the other flavors always place their deployment-oriented dependencies in `devDependencies`, and that you will have to pull those into `dependencies` separately.

#### Docker
> `git cherry-pick docker` [[view](https://github.com/hapipal/boilerplate/commit/docker)]

Sets up a Dockerfile and docker-compose.yml file for usage in local development. The Dockerfile is fully production ready, and just needs to integrated into a build system of your choice that supports Docker 17.05 or higher, and Docker Compose files with version v3.4. This flavor also introduces two `build` and four `docker` npm scripts, which are described in the [`DOCKER.md`](https://github.com/hapipal/boilerplate/blob/flavor-docker/DOCKER.md) file that comes with the flavor.

#### Fancy Templated Site
> `git cherry-pick fancy-templated-site` [[view](https://github.com/hapipal/boilerplate/commit/fancy-templated-site)]

Sets-up [handlebars](https://github.com/wycats/handlebars.js/) templating with a useful layout and openly serves the `lib/public` directory, which contains folders to place javascript and CSS.  This flavor introduces several npm scripts: one to minify front-end javascript with [uglify](https://github.com/mishoo/UglifyJS2) (`npm run build:js`); one to minify CSS with [PostCSS](https://github.com/postcss/postcss)/[cssnano](https://github.com/ben-eb/cssnano) (`npm run build:css`); and one to do both (`npm run build`).  A plugin option `developmentMode` controls whether the minified or un-minified javascript and CSS are served on the page.  The `developmentMode` is configured to be active when `NODE_ENV` is not `production`.

This flavor additionally incorporates [browserify](https://github.com/substack/node-browserify), [Sass](https://www.npmjs.com/package/node-sass), and [Browsersync](https://github.com/Browsersync/browser-sync).  As such, there are scripts to support the pre-building process: one to pre-build javascript from Node.js-style to ES5 using browserify and [Babel](https://github.com/babel/babel) (`npm run prebuild:js`); and one to pre-build CSS from SCSS using node-sass.  When `developmentMode` is active browser-sync will rebuild SCSS and Node.js-style javascript, then reload the page or stylesheets as necessary.

### Versioning
> Note: most of the time you'll be pulling in flavors at the time you install the pal boilerplate, in which case you don't need to worry much about flavor versioning.

It's worth noting that over time these flavor tags may point to different commits.  The flavors are updated to keep-up with the latest pal boilerplate.  For this reason, as flavor tags move, we leave static versioned tags for your convenience.  Tags are named as such:
```
<flavor-name>-v<major>.<minor>.<patch>
```
where:

 - `<flavor-name>` - the name of this flavor.  Identical to the unversioned tag for this flavor.
 - `<major>` - the major version of the flavor, identical to the major version of the pal boilerplate that it is compatible with.
 - `<minor>` - the minor version of the flavor, bumped when a feature is added to the flavor (rare), but more typically when its dependencies are updated.
 - `<patch>` - the patch version of the flavor, bumped when a bug is fixed in the flavor, or the flavor requires update to account for bugs in the version of the pal boilerplate with which it is compatible.

For example the first version of the "custom swagger" flavor is:
```
custom-swagger-v1.0.0
```

<br>
<a href='https://hapipal.com'>
  <div align='center'>
    <img width='280' src='https://imgur.com/rWnkFOO.png' />
  </div>
</a>
<br>
