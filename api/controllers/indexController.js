module.exports = {

  indexRender:function (req, res) {
    var socket = req.socket;
    var io = sails.io;
    var events = require('events');

    //db
    //var Panel = mongoose.model('Panel');
    //var PanelData = mongoose.model('PanelData');

    //socket
    io.on('connection', function (socket) {

        var callBackForWithDate = function(err, paneldatas) {
            if(err) {
                console.error(err);
            }

            io.emit('addPanelDataList', !err ? paneldatas : []);
        };

        socket.on('retrievePanelDataWithDate', function (panelId, date, nextDate) {

            PanelData.find({
                panelId: panelId,
                date: {
                    $gte: date,//greater and equal
                    $lt: nextDate//lesser than
                }
            }, callBackForWithDate).sort({date: 1});
        });
    });


    console.log('rendera kadar çalışıyor');

    res.render('homepage', {message: ''});
  },
};
