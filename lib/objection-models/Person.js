// import uuid from 'uuid'
const Model = require('hapiObjection').Model;

module.exports = (srv, options) => {

    return class Person extends Model {

        constructor(...args) {
            super(...args);
        }

        get tableName() {
            return 'Person';
        }

        contents() {
            return this.hasMany('Content', 'resourceId');
        }
    }
}
