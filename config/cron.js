module.exports.cron = {

  VeriUret: {
    schedule: '*/30 * * * * *', //her 10 sn'de bir çalışır.
    //schedule: '00 36 21 * * *', //her gün saat 10:00:00'da yapay zeka scripti çalıştırılarak sonuç üretilir ve apilere yollanır.
    onTick: function () {
      console.log("tick");
      var fs = require('fs');
      var request = require('request');
      var Twitter = require('twitter');
      var GoogleUrl = require('google-url');
      googleUrl = new GoogleUrl( { key: 'AIzaSyCANvOYmqH9-4a0e39Pe3xx99WSIAUyeDc' });
      var client = new Twitter({//twitter app bilgileri.
        consumer_key: 'bL7eaEI0w3EhJbuM1rtUXrNjs',
        consumer_secret: 'pDc7R0iSNX2Nh8mIJ93p4xKcPEiA0cIbNdwtAJVunGcDP8Iru4',
        access_token_key: '865331824108728320-fldTUJSsBmBIEEbc7yVl3B1eSbrRePc',
        access_token_secret: 'j5scoCfEy4IsEu0XUH5T2CvLjWrB7wJQR2zMv4E2xVh29'
      });
      var token = "EAACl9XZC0IeYBALzrIycNGBUZAP4qwuTVzQ0MAgCU1gTOtD8ihQZAESTj8JRz7sfTn453ZBZBpaHTAzg6GbhXZANHfwVGZAqV70e022v8kZAZBDdL6YrGijlZAbYQf1fvAl2ZBuu4zR7jc8JHVOCezHifDTelZAlYKUVs7AZD"
      //longlivetoken

      if (fs.existsSync('k-means.R')) {
          var sys = require('sys')
          var exec = require('child_process').exec;
          function puts(error, stdout, stderr) {
            //console.log(stdout)
          }
          exec("Rscript D:/gunesPaneli/k-means.R", puts);

          fs.readFile("sonuc.txt", 'utf8', function(err, data) {
            if (err){ console.log(err);}
            console.log(data);//çıkarım sonucu

            googleUrl.shorten( sails.getBaseUrl(), function( err, shortUrl ) {//rul kısaltılıyor.
                console.log(shortUrl);

              	request({
              		url: "https://graph.facebook.com/v2.8/1871951589723709/feed",
              		qs: { access_token: token },
              		method: "POST",
              		json: {
              			//url: "https://0785d3cb.ngrok.io",
                    message: data + " -> " + shortUrl,
              		}
              	}, function(error, response, body) {
                  if (error) {
                    console.log("Error sending message: ", error);
                  } else if (response.body.error) {
                    console.log("Facebook Error: ", response.body.error);
                  }else {
                    console.log("Facebook'ta paylaşıldı.");
                  }
              	});


            var status = {
                status: data + " " + shortUrl,
            }
            client.post('statuses/update', status, function(error, tweet, response) {
                if (!error) {
                  console.log("Tweet atıldı.");
                }else {
                  console.log("Twitter Error: ", response.body.error);
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
          console.log("R scripti bulunamadı.");
      }

    }
  }



};
