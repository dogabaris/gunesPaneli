module.exports = {
  statisticRender: function (req, res) {
    var socket = req.socket;
    var io = sails.io;
    var events = require('events');

    //socket
    io.on('connection', function (socket) {

      socket.on('retrieveStatistics', function (panelId, date, nextDate) {

        /*User.find(function(err, users) {
            if (err) {return res.serverError(err);}
            return res.view({users: users});
        });*/

          Cikarim.find().exec(function (err, ret) {
                if (err) return res.serverError(err);

                io.emit('showStatistics', ret);
          });

      });

    });
    res.render('statistics', {message: ''});
  },

}
