module.exports = {
    //var express = require('express');

    //var events = require('events');
manageRender:function (req, res) {
    var socket = req.socket;
    var io = sails.io;
    var events = require('events');
    var mongoose = require('mongoose');

    //db
    //var Panel = mongoose.model('Panel');
    //var PanelData = mongoose.model('PanelData');

    //route
    //var router = express.Router();

    //router.get('/', function (req, res, next) {
    //    res.render('manage', {message: ''});
    //});

/*
    router.get('/veri_kaydet', function (req, res, next) {

        if((req.query.panelId).length > 3){

            var newPanelData = new PanelData({
                panelId: req.query.panelId,
                current: req.query.akim,
                voltage: req.query.gerilim,
                light: 0,
                temperature: req.query.sicaklik,
                moisture: req.query.nem,
                date: new Date()
            });

            newPanelData.save(function(err){
                if(err) {
                    console.error(err);
                }
            });

            io.emit('retrievePanelData', newPanelData);

            res.render('OK');
        }else{
            res.render('error',{message: 'parametreler eksik.',error:{status:'500', stack:'ee'}});
        }
        //res.render('manage', {message: ''});
    });
*/
    //event
    var manager = new events.EventEmitter();
    manager.setMaxListeners(0);
    var creationStatus = false;
    var sendPanelData = null;

    var pDM = new function () {
        this.panelMap = {};
        this.timer = '';

        this.setPanelMap = function(panelList){
            this.panelMap = {};

            for(var i = 0; i < panelList.length; i++) {
                if(!panelList[i].status) continue;

                this.panelMap[panelList[i]._id] = panelList[i].status;
            }
        };

        this.managePanel = function(panel){
            this.panelMap[panel._id] = panel.status;
        };

        this.removePanel = function(panel){
            this.panelMap[panel._id] = undefined;
        };

        /*this.startDataCreate = function() {
            var me = this;
            this.timer = setInterval(function(){
                for (key in me.panelMap) {
                    if (me.panelMap.hasOwnProperty(key)
                        && me.panelMap[key]) {

                        var newPanelData = new PanelData({
                            panelId: key,
                            current: parseInt(Math.random()*1000),
                            voltage: parseInt(Math.random()*1000),
                            light: parseInt(Math.random()*100),
                            temperature: parseInt(Math.random()*100),
                            moisture: parseInt(Math.random()*100),
                            date: new Date()
                        });

                        newPanelData.save(function(err){
                            if(err) {
                                console.error(err);
                            }
                        });

                        io.emit('retrievePanelData', newPanelData);
                    }
                }
            }, 500);

            creationStatus = true;
        };*/

        this.stopDataCreate = function() {
            clearInterval(this.timer);

            creationStatus = false;
        };
    };

    /*
    function getNow() {
        var d = new Date();

        return new Date(
            (d.getTime()) +
            (d.getTimezoneOffset() * 60000) +
            (3600000 * 5)
        );
    }
    */

    manager.on('setPanelMap', pDM.setPanelMap);
    manager.on('managePanel', pDM.managePanel);
    manager.on('removePanel', pDM.removePanel);
    //manager.on('startDataCreate', pDM.startDataCreate);
    manager.on('stopDataCreate', pDM.stopDataCreate);

    //socket
    io.on('connection', function (socket) {

        socket.on('retrievePanelList', function(page, setMap) {
            sendPanelList(page, setMap);
        });

        socket.on('addPanel', function(data) {

          Panel.new({
            name: data.name,
            cityCode: data.cityCode,
            status: data.status,
            countryCode: data.countryCode,
            status: data.status,  //ekleyen kullanıcının id'si
          }, function (err, newPanelData) {
                if(err)
                  console.log(err);
                else
                  console.log(newPanelData);
          });

        });

        socket.on('addPanel2', function(panel) {
            var newPanel = new Panel(panel);


            newPanel.save(function(err){
                if(err) {
                    console.error(err);
                } else {
                    manager.emit('managePanel', newPanel);
                }

                sendPanelList();
            });
        });

        socket.on('editPanel', function(panel) {
            //console.log(panel);


            Panel.findById(panel._id, function(err, p){
                if(err) {
                    console.error(err);
                } else {
                    p.name      = panel.name;
                    p.status    = panel.status;
                    p.macAddr   = panel.macAddr;
                    p.location  = panel.location;
                    p.ipAddr    = '-';

                    p.save(function(err){
                        if(err) {
                            console.error(err);
                        } else {
                            manager.emit('managePanel', p);
                        }

                        sendPanelList();
                    });
                }
            });
        });

        socket.on('removePanel', function(panel) {

            Panel.find({_id:panel._id}).remove(function(err){
                if(err) {
                    console.error(err);
                } else {
                    PanelData.find({panelId:panel._id}).remove(function(err){
                        if(err) {
                            console.error(err);
                        }
                    });

                    manager.emit('removePanel', panel);
                }

                sendPanelList();
            });
        });

        /*socket.on('startDataCreate', function(){
            manager.emit('startDataCreate');
        });*/

        socket.on('stopDataCreate', function(){
            manager.emit('stopDataCreate');
        });

        socket.on('checkCreationStatus', function(){
            io.emit('checkCreationStatus', creationStatus);
        });

        function sendPanelList(page, addToManager) {
            if(!page) {
                page = 1;
            }

            Panel.find({}, function(err, panels) {
                if(err) {
                    console.error(err);
                }

                io.emit('retrievePanelList', !err ? panels : []);

                if(addToManager) {
                    manager.emit('setPanelMap', !err ? panels : []);
                }
            });
        }

        /*
        * Bu değişken panellerin mac adresiyle panel_id değerlerini tutuyor.
        * {macAddr: panelId, macAddr: panelId}   formatında tutuluyor.
        * kayıtlar dinamik olarak ekleniyor.
        * güneş panelinden ilk kez veri geldiğinde panelin mac adresinden veritabanından panel idsini bulup buraya ekleniyor
        * */
        var macToPanelId = {};

        var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID; //panel ObjectId'ye dönüştürülmesi gerekiyor Mongoda ObjectId olarak tutulduğu için

        socket.on('testVerileri', function(veriler){
          //console.log(veriler);

                  PanelData.create({
                      panelId     : veriler.panelId, //new ObjectId(veriler.panelId) veriler.panelId
                      current        : veriler.current,
                      voltage     : veriler.voltage,
                      light    : veriler.light,
                      temperature: veriler.temperature,
                      moisture         : veriler.moisture,
                      date        : new Date()
                  }).exec(function(err, newPanelData)
                  {
                      if (err)
                      console.log(err);
                      else
                      console.log("kaydedildi!");

                      //io.emit('retrievePanelData', newPanelData);
                  });

        });


        socket.on('ipAdresiGuncelle',function(panel){
            Panel.findOne({macAddr: panel.macAddr}, function(err, res){
                if(err) {
                    console.error(err);
                } else {

                    res.ipAddr = panel.ipAddr;

                    res.save(function (err) {
                        if(err) {
                            console.error('ERROR!');
                        }else{
                            console.error(panel.macAddr+' mac adresi '+panel.ipAddr+' ip\'si ile eşleştirildi.');
                        }
                    });
                }
            });
        });

        /*PanelData.find().groupBy({{
                                  _id: {
                                      month: { $month: "$date" },
                                      year: { $year: "$date" }
                                  },
                                  ortAkim: {$avg: '$akim'},
                                  ortGerilim: {$avg: '$gerilim'},
                                  ortSicaklik: {$avg: '$sicaklik'},
                                  totalNem: {$sum: '$nem'}
                              }).exec(function (err, data){
                                if (err) return res.serverError(err);

                                io.emit('allShowDataListen', ret);
                              });*/





        socket.on('allDataShow', function(panel){

            PanelData.native(function(err, panelCollection) {//SAILSTE AGGREGATE KULLANIMI İÇİN
            if (err) return res.serverError(err);//hata döndürür

            //console.log("*** " + ObjectId(panel));

            panelCollection.aggregate([
              {
                $match: {
                    panelId: panel
                    //panelId: "56eb3d5d7c727d861b3278ec"
                }
              },
              {
                $group: {
                  _id: {
                      month: { $month: "$date" },
                      year: { $year: "$date" }
                      //month: { $month: "3" },
                      //year: { $year: "2017" }
                  },
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

                  io.emit('allShowDataListen', ret);
            });
              //.sort("-date")
            });
        });

        socket.on('allDataAllYearsShow', function(panel){

            PanelData.native(function(err, panelCollection) {//SAILSTE AGGREGATE KULLANIMI İÇİN
            if (err) return res.serverError(err);//hata döndürür

            //console.log("*** " + ObjectId(panel));

            panelCollection.aggregate([
              {
                $match: {
                    panelId: panel
                    //panelId: "56eb3d5d7c727d861b3278ec"
                }
              },
              {
                $group: {
                  _id: {
                      //month: { $month: "$date" },
                      year: { $year: "$date" }
                      //month: { $month: "3" },
                      //year: { $year: "2017" }
                  },
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

                  io.emit('allShowDataListenAllYears', ret);
            });
              //.sort("-date")
            });
        });

    });


    res.render('manage');
  }
};
