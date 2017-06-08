module.exports = {

  attributes: {
    cikarim: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date',
      defaultsTo: 'true'
    },
    url: {
      type: 'string',
      defaultsTo: 'true'
    }
  },

  new: function(inputs, cb){
    Cikarim.create({
      cikarim: inputs.cikarim,
      date: inputs.date,
    })
    .exec(cb);
  },

  connection: 'mongodb'
};
