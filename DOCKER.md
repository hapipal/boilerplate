## `docker` Flavor
This flavor of the pal boilerplate is designed to get someone up and running
using Docker with scalable best practices. Certain features require the `deployment`
flavor of the pal boilerplate to be installed as well in order to function.

## Basics
This [Dockerfile](./server/Dockerfile) uses
[multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
to create different Docker images depending on the environment the images will
be running in, while ensuring best practices are followed to keep image size low
and create a security sandbox if you are running a server.

We are using Docker Compose to define `web` and `test` services. The `web` wervice uses
the `release` Dockerfile stage, and the `test` service uses the `test` Dockerfile stage.

### `docker-compose.yml` Services
The `docker-compose.yml` file defines four services. The reason for the `*_base` services
is that certain CI providers like CircleCI do not support voluming in files, and you will
get strange file system errors if you try to run with a `volumes` block.

#### `web_base`
All configuration for running the webserver locally, minus the `volumes` block.

#### `web`
`web_base`, plus the `volumes` block required for hotreloading to function locally.

#### `test_base`
All configuration for running the tests, minus the `volumes` block.

#### `test`
`test_base`, plus the `volumes` block required to allow re-running tests in
`watch` mode or by hand, but without requiring a full image rebuild.

### Commands

#### `npm run build:test`
Rebuilds the `test` service used for running tests, and will re-install npm
dependencies when they change.

#### `npm run build:web`
Rebuilds the `web` service used locally, and will re-install npm dependencies when
they change.

#### `npm run docker:lint`
Runs the `npm run lint` command in the `test` service.

#### `npm run docker:start`
Starts the `web` service in daemon mode, making it available at `localhost:3000`.

#### `npm run docker:test`
Runs the `npm test` command in the `test` service.

#### `npm run docker:test:ci`
Starts the `test_base` service, which triggers both a `lint` and `test` npm script
run. The process will exit with the same code the internal process exits with,
making this the ideal command to use when integrating with CI.

### `.env`
This flavor no longer uses `.env` files, as it is safer to start the container declaring
the environment variables in either the `docker-compose.yml` file or via the `docker` cli.

If you need to add any environment variables, you can do so in the `docker-compose.yml`
files as shown, or add them to `.env` and load them in as shown
[here](https://docs.docker.com/compose/compose-file/#env_file).

### Stages
There are currently four stages in the Dockerfile that are used.

#### `base`
Contains all package installs, files system modifications, and entrypoint declaration.
Any commands that will not change across the other stages or are required for multiple
other stages to execute properly should be put in this stage.

#### `dependencies`
The `dependencies` stage is used to install npm dependencies, copy all of your source
files, and then optionally run any build commands that need to be executed. The desired
outcome of this stage is an image that contains all dependencies, all source files, and
all built assets (if necessary).

In order to run build scripts, you will need to locate this stage in the Dockerfile
and uncomment the `RUN npm run build` command that is in there, possibly changing the
command if you are using multiple build scripts in your `package.json`.

#### `test`
The `test` stage is used for running your test suite. It changes the user to `node`
to mimic the production environment, and then runs `npm lint && npm test` which should
run your full test suite. The container will exit with the same code as your test
runner, which means that in CI you can run `npm run docker:test:ci` as your test step to
automatically build your test image and then run your tests inside of it.

#### `development`
The `development` stage is meant to run your server locally with dev deps installed. The
`docker-compose.yml` file can be used to tweak the environment variables used for
this stage when running locally, and the logic for building this stage should not
make any assumptions about what environment the output will be used in.

#### `release`
The `release` stage is meant to run your server in a production-like setup without dev deps.
The `docker-compose.yml` file can be used to tweak the environment variables used for
this stage when running locally, and the logic for building this stage should not
make any assumptions about what environment the output will be used in.

## Local Development
If you are using the `development` flavor alongside this `docker` flavor, you can simply
run `npm run docker:start` to build the release stage of the Dockerfile, and then start
it as a `daemon` in Docker. You can then visit `localhost:3000` to hit your server.

By default, the server is started using `nodemon` when you start it using
`docker-compose`, which means every time you save a file the server will be restarted
automatically with your fresh changes.

### Running Tests
Running tests locally is extremely easy. Simply run `npm run docker:test`, and linting
and testing will be run. If you modify the `package*.json` files, you will need to run
`npm run build:test` to trigger a reinstall of your dependencies.

### Secret Management (`.env`)
This removes the option to have a `.env` files for secrets locally, because those environment
variables can now just be set in the `docker-compose.yml` file `environment` section. If
you have true secrets that you need locally and cannot check into Git, you can re-create
the `server/.env` file, and then add a key in the `*_base` services in `docker-compose.yml`
that is simply `env_file: server/.env` at the same level in the yaml as the `environment` key.

## Changing the Port
Currently the build process assumes that the port default of `3000` in
`server/manifest.js` is being used. `server/Dockerfile` has an `EXPOSE` command that
references this port, and `docker-compose.yml` also contains a mapping of port `3000`
in the container to port `3000` on the host machine.
