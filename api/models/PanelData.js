/**
 * PanelData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    panelId: {
      //type: 'json', //otomatik veri ekleneceğinde kullanılan format
      type: 'string',
      //type: 'objectid',
      required: true
    },
    current: {
      type: 'integer',
      required: true
    },
    voltage: {
      type: 'integer',
      required: true
    },
    light: {
      type: 'integer',
      required: true
    },
    temperature: {
      type: 'integer',
      required: true
    },
    moisture: {
      type: 'integer',
      required: true
    },
    date: {
      type: 'date',
      required: true
    }
  },

  new: function(inputs, cb){
    PanelData.create({
      panelId: inputs.panelId,
      current: inputs.current,
      voltage: inputs.voltage,
      light: inputs.light,
      temperature: inputs.temperature,
      moisture: inputs.moisture,
      date: inputs.date
    })
    .exec(cb);
  },

  connection: 'mongodb'
};
