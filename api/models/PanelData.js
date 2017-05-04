/**
 * PanelData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    panelId: {
      type: 'objectid',
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
  connection: 'mongodb'
};
