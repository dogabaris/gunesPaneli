module.exports.cron = {

  VeriUret: {
    //schedule: '*/30 * * * * *',
    schedule: '00 00 10 * * *', //her gün saat 10:00:00'da yapay zeka scripti çalıştıırlarak sonuç üretilir ve apilere yollanır.
    onTick: function () {
      console.log("tick");
      var fs = require('fs');

      if (fs.existsSync('k-means.R')) {
          console.log("var ");
          var sys = require('sys')
          var exec = require('child_process').exec;
          function puts(error, stdout, stderr) { console.log(stdout) }
          exec("Rscript D:/gunesPaneli/k-means.R", puts);
      }else{
          console.log("yok");
      }

    }
  }



};
