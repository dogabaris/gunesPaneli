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

        var callBackForWithDetails = function(err, paneldatas) {
            if(err) {
                console.error(err);
            }

            io.emit('addPanelDataDetailList', !err ? paneldatas : []);

        };

        var callBackForAnlik = function(err, paneldatas) {
            if(err) {
                console.error(err);
            }

            console.log(paneldatas);

            io.emit('showAnlikBaslangic', !err ? paneldatas : []);

        };

        socket.on('retrievePanelDataWithDate', function (panelId, date, nextDate) {

            PanelData.find({
                panelId: panelId,
                date: {
                    $gte: date,//greater and equal
                    $lt: nextDate//lesser than
                }
            }, callBackForWithDate);

        });


        socket.on('retrieveDetails', function (panelId) {

            PanelData.find({
                panelId: panelId,
                /*date: {
                    $gte: date,//greater and equal
                    $lt: nextDate//lesser than
                }*/
            }, callBackForWithDetails);

        });

        socket.on('retrieveBaslangicPanelDataAnlik', function (panelId, date) { //Anlık verileri gönderir.

            PanelData.find({
                panelId: panelId,
                date: {
                    $gte: date,//greater and equal
                }
            }, callBackForAnlik);


        });

        socket.on('retrievePanelDataAnlik', function (panelId, anlikDate) { //Anlık verileri gönderir.

            PanelData.find({
                panelId: panelId,
                date: { '>=': anlikDate }
            }, callBackForAnlik);

            /*PanelData.native(function(err, panelCollection) {//SAILSTE AGGREGATE KULLANIMI İÇİN
              if (err) return res.serverError(err);

                panelCollection.find([
                  {
                    $match: {
                        panelId: panelId,
                        day: date
                        //panelId: "56eb3d5d7c727d861b3278ec"
                    }
                  },
                ],
                  function (err, ret) {
                        //console.log("******** " + ret);
                        if (err) return res.serverError(err);
                        //console.log(date);
                        io.emit('showAnlik', ret);
                  });

            });*/
        });

        var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

        socket.on('retrievePanelDataWithDateYears', function (panelId, date) { //Verilen gün yıllara göre ortalamalarını gösterir.

                PanelData.native(function(err, panelCollection) {//SAILSTE AGGREGATE KULLANIMI İÇİN
                if (err) return res.serverError(err);

                panelCollection.aggregate([
                  {
                    $addFields: {
                                  year: {$year: "$date"},
                                  day: {$dayOfMonth: "$date"},
                                  month : {$month: "$date" }
                                }
                  },
                  {
                    $match: {
                        panelId: panelId,
                        day: date
                        //panelId: "56eb3d5d7c727d861b3278ec"
                    }
                  },
                  {
                    $group: {
                      _id: "$year" ,
                      ortAkim: {$avg: "$current"},
                      ortGerilim: {$avg: "$voltage"},
                      ortSicaklik: {$avg: "$temperature"},
                      ortNem: {$avg: "$moisture"}
                    }
                  }

                ],
                function (err, ret) {
                      //console.log("******** " + ret);
                      if (err) return res.serverError(err);
                      //console.log(date);
                      io.emit('allShowDataListenYears', ret);
                });

                });
        });


    });




    res.render('homepage', {message: ''});
  },
};
