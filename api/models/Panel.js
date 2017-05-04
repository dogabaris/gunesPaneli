/**
 * Panel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    cityCode: {
      type: 'string',
    },
    countryCode: {
      type: 'string',
    },
    status: {
      type: 'boolean',
      defaultsTo: 'true'
    }
  },

  new: function(inputs, cb){
    Panel.create({
      name: inputs.name,
      cityCode: inputs.cityCode,
      status: inputs.status,
      countryCode: inputs.countryCode,
      status: inputs.status
    })
    .exec(cb);
  },

  connection: 'mongodb'
};
