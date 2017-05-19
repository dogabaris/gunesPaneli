module.exports = {

  attributes: {
    cikarim: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date',
      defaultsTo: 'true'
    }
  },

  new: function(inputs, cb){
    Panel.create({
      cikarim: inputs.cikarim,
      date: inputs.date,
    })
    .exec(cb);
  },

  connection: 'mongodb'
};
