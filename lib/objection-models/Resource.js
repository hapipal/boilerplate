// import uuid from 'uuid'
const Model = require('hapiObjection').Model;

module.exports = (srv, options) => {

    return class Resource extends Model {

        constructor(...args) {

            super(...args);
            console.log(Model);

            this.on('creating', () => {
                // this.set('id', uuid.v4())
                console.log("Creating a resource!");
            })
        }

        get tableName() {
            return 'Resource'
        }

        contents() {
            return this.hasMany('Content', 'resourceId')
        }
    }
}
