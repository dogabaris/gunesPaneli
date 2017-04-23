/**
 * PanelData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    panelId: {
      type: 'integer',
      required: true
    },
    akim: {
      type: 'integer',
      required: true
    },
    gerilim: {
      type: 'integer',
      required: true
    },
    sicaklik: {
      type: 'integer',
      required: true
    },
    nem: {
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
