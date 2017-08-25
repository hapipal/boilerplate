# hapi pal boilerplate

A friendly, proven starting place for your next hapi plugin or deployment

**Features**
 - Provides conventions for building plugins by mapping the entire hapi plugin API onto files and folders, using [haute-couture](https://github.com/devinivy/haute-couture).
 - Designed to allow you to deploy your plugin on its own or as part of a larger application.
 - Textbook integrations with Objection ORM, Swagger UI, and more via [flavors](#flavors).
 - Fully setup with a [lab](https://github.com/hapijs/lab) test suite and [eslint](https://github.com/eslint/eslint) configuration.
 - Powerful, [12factor](https://12factor.net/)-oriented deployment configuration using
 [confidence](https://github.com/hapijs/confidence) and [dotenv](https://github.com/motdotla/dotenv).
 - Up-to-date versions of all dependencies.
 - Follows established hapi best practices out of the box.
 - The code is minimal and completely generic– no need to find-and-replace with your project name to get started.

## Getting Started
In this example our project is called `my-project` :droplet:

```bash
$ git clone --depth=1 --origin=pal --branch=pal git@github.com:devinivy/boilerplate-api.git my-project
$ cd my-project
$ git checkout --orphan master # New branch without history
$ npm install
$ npm start
```

If everything goes well you should see this :surfer:

```bash
> boilerplate-api@0.3.0 start /Users/maxfelker/my-project
> node server
Server started at http://0.0.0.0:3000
```

Now your app is running at [http://0.0.0.0:3000](http://0.0.0.0:3000) :potable_water: hapi boiling!

Time for your first commit? :ocean:

```bash
$ git remote add origin git@github.com:my-username/my-project.git
$ npm init # Rename, reversion, describe your plugin
$ git commit -am "First commit :o)"
```

## Flavors

hapi pal makes it easy to use the boilerplate as a jumping-off point for several different types of projects, which we call "flavors" (:lollipop: :fries: :doughnut: :poultry_leg:).  Flavors may be mixed and matched, or skipped altogether.  Only utilize them if they'll be useful to you!

They're simple little buggers.  We've simply tagged commits that we think will contain useful code patches depending on what direction you'd like to take your project.

**Pull down the latest flavors**
```sh
git fetch pal --tags
```

**Use some flavors**
```sh
git cherry-pick flavor-one flavor-two
```

### Available flavors
#### Swagger
> `git cherry-pick swagger` [[view](https://github.com/devinivy/boilerplate-api/commit/swagger)]

Integrates [hapi-swagger](https://github.com/glennjones/hapi-swagger) onto the server with some reasonable default configuration.

#### Custom Swagger
> `git cherry-pick custom-swagger` [[view](https://github.com/devinivy/boilerplate-api/commit/custom-swagger)]

Integrates [hapi-swagger](https://github.com/glennjones/hapi-swagger) onto the server with some reasonable default configuration, and also includes an editable handlebars template for swagger-ui.

#### Objection ORM
> `git cherry-pick objection` [[view](https://github.com/devinivy/boilerplate-api/commit/objection)]

Integrates [Objection ORM](https://github.com/Vincit/objection.js) into your server and plugin using the hapi plugin [schwifty](https://github.com/BigRoomStudios/schwifty).  This is a great way to get started with a SQL-oriented plugin.  Adds a `models/` directory to your plugin where Objection models should be placed, and a `migrations/` directory where your migrations should be placed.  Configured to work with SQLite out of the box.

##### Using the knex CLI
We've added an npm script for `knex` so that you can avoid writing the whole path to the knex CLI (`node_modules/.bin/knex`) when running commands.  To use the knex CLI, you may write your commands as `npm run knex -- <knex-command>`.

For example, to create a new migration,
```
npm run knex -- migrate:make my-first-migration
```

#### Deployment
> `git cherry-pick deployment` [[view](https://github.com/devinivy/boilerplate-api/commit/deployment)]

By default all deployment-oriented dependencies are placed in package.json's `devDependencies`.  This flavor pulls all the default deployment dependencies up into `dependencies`.  This is useful when you want to use pal primarily as a deployment rather than a harness to author an application plugin.  Note that the other flavors always place their deployment-oriented dependencies in `devDependencies`, and that you will have to pull those into `dependencies` separately.

#### Templated Site
> `git cherry-pick templated-site` [[view](https://github.com/devinivy/boilerplate-api/commit/templated-site)]

Sets-up [handlebars](https://github.com/wycats/handlebars.js/) templating with a useful layout and openly serves the `lib/public` directory, which contains folders to place javascript and CSS.  This flavor additionally introduces three npm scripts: one to minify front-end javascript (`npm run build:js`) with [uglify](https://github.com/mishoo/UglifyJS2); one to minify CSS with [PostCSS](https://github.com/postcss/postcss)/[cssnano](https://github.com/ben-eb/cssnano) (`npm run build:css`); and one to do both (`npm run build`).  Lastly, this flavor introduces a plugin option `developmentMode` that controls whether the minified or un-minified javascript and CSS are served on the page.  The `developmentMode` is configured to be active when `NODE_ENV` is not `production`.

#### Fancy Templated Site
> `git cherry-pick fancy-templated-site` [[view](https://github.com/devinivy/boilerplate-api/commit/fancy-templated-site)]

Building on top of the [templated site flavor](#templated-site), this flavor also incorporates [browserify](https://github.com/substack/node-browserify), [Sass](https://www.npmjs.com/package/node-sass), and [Browsersync](https://github.com/Browsersync/browser-sync).  As such, there are two new npm scripts: one to pre-build javascript from nodejs-style to ES5 using browserify and [Babel](https://github.com/babel/babel) (`npm run prebuild:js`); and one to pre-build CSS from SCSS using node-sass.  When `developmentMode` is active browser-sync will rebuild SCSS and nodejs-style javascript, then reload the page or stylesheets as necessary.

### Versioning
> Note: most of the time you'll be pulling in flavors at the time you install the pal boilerplate, in which case you don't need to worry much about flavor versioning.

It's worth noting that over time these flavor tags may point to different commits.  The flavors are updated to keep-up with the latest pal boilerplate.  For this reason, as flavor tags move, we leave static versioned tags for your convenience.  Tags are named as such,
```
<flavor-name>-v<major>.<minor>.<patch>
```
where,

 - `<flavor-name>` - the name of this flavor.  Identical to the unversioned tag for this flavor.
 - `<major>` - the major version of the flavor, identical to the major version of the pal boilerplate that it is compatible with.
 - `<minor>` - the minor version of the flavor, bumped when a feature is added to the flavor (rare), but more typically when its dependencies are updated.
 - `<patch>` - the patch version of the flavor, bumped when a bug is fixed in the flavor, or the flavor requires update to account for bugs in the version of the pal boilerplate with which it is compatible.

For example the first version of the "custom swagger" flavor is,
```
custom-swagger-v1.0.0
```
