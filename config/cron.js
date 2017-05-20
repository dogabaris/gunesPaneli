module.exports.cron = {

  VeriUret: {
    //schedule: '*/10 * * * * *', //her 10 sn'de bir çalışır.
    schedule: '00 28 19 * * *', //her gün saat 10:00:00'da yapay zeka scripti çalıştırılarak sonuç üretilir ve apilere yollanır.
    onTick: function () {
      console.log("tick");
      var fs = require('fs');
      var request = require('request');
      var Twitter = require('twitter');
      var GoogleUrl = require( 'google-url' );
      googleUrl = new GoogleUrl( { key: 'AIzaSyCANvOYmqH9-4a0e39Pe3xx99WSIAUyeDc' });


      var client = new Twitter({//twitter app bilgileri.
        consumer_key: 'bL7eaEI0w3EhJbuM1rtUXrNjs',
        consumer_secret: 'pDc7R0iSNX2Nh8mIJ93p4xKcPEiA0cIbNdwtAJVunGcDP8Iru4',
        access_token_key: '865331824108728320-865331824108728320-bPe2vX1qWBcRqJICpubS0mtNrlQfwrK',
        access_token_secret: 'INPo67sgsbaWhQDehWSjDp2grCJTsxRJPTyVCWxQr0JC8'
      });


      if (fs.existsSync('k-means.R')) {
          console.log("var ");

          var sys = require('sys')
          var exec = require('child_process').exec;
          function puts(error, stdout, stderr) {
            //console.log(stdout)
          }
          exec("Rscript D:/gunesPaneli/k-means.R", puts);

          fs.readFile("sonuc.txt", 'utf8', function(err, data) {
            if (err) throw err;
            console.log(data);//çıkarım sonucu
            googleUrl.shorten( sails.getBaseUrl(), function( err, shortUrl ) {
                // shortUrl should be http://goo.gl/BzpZ54
                console.log(shortUrl);


          	request({//facebook sayfasında paylaşılıyor.
          		url: "https://graph.facebook.com/v2.8/1871951589723709/feed",
          		qs: { access_token: "EAACl9XZC0IeYBAH3k0rHIYq3ER8WLiQb9GkKZBUnmGfq0tbZCZCcCFWkSNZCadofrZCRsojq8Rp9Q5ZAsMgoTqtWfXxjNh2apAXsIqQUYTr8lKlywXwhLwYWhZBt4UeehxvTRB54ZC4AnypSBeZBEGQqkLj2Bq4moS9Gdtf08w3To0IEZAlOuZCA09ZAiqPZBSuiOc1vYZD" },
          		method: "POST",
          		json: {
          			//url: "http://95fc700d.ngrok.io",
                message: data + " -> " + shortUrl
          		}
          	}, function(error, response, body) {
          		if (error) {
          			console.log("Error sending message: ", error);
          		} else if (response.body.error) {
          			console.log("Error: ", response.body.error);
              }else {
                console.log("facebook'ta paylaşıldı.");
              }
        	  });

            var status = {
                status: data + " " + shortUrl
            }
            client.post('statuses/update', status, function(error, tweet, response) {
                if (!error) {
                  console.log("tweet atıldı.");
                }else {
                  console.log(error + " " + response);
                }
            });

            Cikarim.create({
                cikarim     : data,
                date        : new Date(),
                url         : shortUrl
            }).exec(function(err, newPanelData)
            {
                if (err)
                console.log(err);
                else
                console.log("Veritabanına kaydedildi!");
            });
          });

          });


      }else{
          console.log("yok");
      }

    }
  }



};
