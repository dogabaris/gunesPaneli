module.exports.cron = {

  VeriUret: {
    //schedule: '*/10 * * * * *', //her 10 sn'de bir çalışır.
    schedule: '00 03 03 * * *', //her gün saat 10:00:00'da yapay zeka scripti çalıştırılarak sonuç üretilir ve apilere yollanır.
    onTick: function () {
      console.log("tick");
      var fs = require('fs');
      var request = require('request');
      var Twitter = require('twitter');

      var client = new Twitter({//twitter app bilgileri.
        consumer_key: 'bL7eaEI0w3EhJbuM1rtUXrNjs',
        consumer_secret: 'pDc7R0iSNX2Nh8mIJ93p4xKcPEiA0cIbNdwtAJVunGcDP8Iru4',
        access_token_key: '	865331824108728320-bPe2vX1qWBcRqJICpubS0mtNrlQfwrK',
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

            messageData = {
          		text: "text"
          	};
          	request({//facebook sayfasında paylaşılıyor.
          		url: "https://graph.facebook.com/v2.8/1871951589723709/feed",
          		qs: { access_token: "EAACl9XZC0IeYBALZATJsfm2q8bn33ji1ZBCZC838YQUVhL4KCzEZAbRqQEaoKa6syBi6Hsff3q4upIZC6admsTROjJQlS0viJrOzbq6fpkWz1ZBZBkF9R8bHsjubK6kpWKScXd2Xxh1ZBMzlewPNQfwGKmsZCYPtrPFGG1rEZBHzqlh4eUGVu2HskJptXeNamzxbtIZD" },
          		method: "POST",
          		json: {
          			//url: "http://95fc700d.ngrok.io",
                message: data
          		}
          	}, function(error, response, body) {
          		if (error) {
          			console.log("Error sending message: ", error);
          		} else if (response.body.error) {
          			console.log("Error: ", response.body.error);

              }
        	  });

            var status = {
                status: data,
            }
            client.post('statuses/update', status, function(error, tweet, response) {
                if (!error) {
                  console.log(tweet);
                }else {
                  console.log(error);
                }
            });




          });


      }else{
          console.log("yok");
      }

    }
  }



};
