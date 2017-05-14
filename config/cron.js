module.exports.cron = {

  VeriUret: {
    schedule: '*/1 * * * * *',
    /*onTick: function () {
      console.log("tick");

      var d_akim = 70;
      var d_geri = 50;
      var d_sica = 40;
      var d_nem  = 30;
      var d_ligh = 25;

      function rand(sayi){

        if(sayi > 100) return 100;
        if(sayi < -100) return -100;

        if(Math.floor((Math.random() * 10))%2 == 1){
          return sayi + (Math.floor((Math.random() * 10))%2);
        }else
          return sayi - (Math.floor((Math.random() * 10))%2);


        //return Math.floor((Math.random() * 100) + 1);
      }

      var veriler = {
      panelId: '56eb3d7b7c727d861b3278ee',
      current: d_akim = rand(d_akim),
      voltage: d_geri = rand(d_geri),
      light: d_ligh = rand(d_ligh),
      temperature: d_sica = rand(d_sica),
      moisture: d_nem = rand(d_nem)
      };


      //var ObjectId = require('mongodb').ObjectID;
      var oid = new (require('mongodb').ObjectId)(veriler.panelId);

      PanelData.new({
          panelId        : oid, //veriler.panelId,
          current        : veriler.current,
          voltage        : veriler.voltage,
          light          : veriler.light,
          temperature    : veriler.temperature,
          moisture       : veriler.moisture,
          date        : new Date()
      }, function (err, newPanelData) {
            if(err)
              console.log(err);
            else
              console.log(newPanelData);
      });

    }*/
  }



};
