var socket = require('socket.io-client')('http://localhost:1337');

var d_akim = 50;
var d_geri = 40;
var d_sica = 30;
var d_nem  = 20;
var d_ligh = 10;

function rand(sayi){

  if(sayi > 100) return 100;
  if(sayi < -100) return -100;

  if(Math.floor((Math.random() * 10))%2 == 1){
    return sayi + (Math.floor((Math.random() * 10))%2);
  }else
    return sayi - (Math.floor((Math.random() * 10))%2);


  //return Math.floor((Math.random() * 100) + 1);
}

var timer = '';

socket.on('connect', function(){

  console.log("sunucuya baglandi");

  timer = setInterval(function(){

    var veriler = {
      panelId:'56eb3d747c727d861b3278ed',//izmit 56eb3d747c727d861b3278ed, gebze 56eb3d8d7c727d861b3278f0, umuttepe 56eb3d5d7c727d861b3278ec, derince 56eb3d7b7c727d861b3278ee, darıca 56eb40487580abd81cca2c7d
      current: d_akim = rand(d_akim),
      voltage: d_geri = rand(d_geri),
      light: d_ligh = rand(d_ligh),
      temperature: d_sica = rand(d_sica),
      moisture: d_nem = rand(d_nem)
     };
    //socket.compress(false).emit('testVerileri', veriler);
    socket.emit('testVerileri', veriler);

    //var veriler = {panelId: '56eb3d7b7c727d861b3278ee', akim: d_akim = rand(d_akim), gerilim: d_geri = rand(d_geri), light: d_ligh = rand(d_ligh), sicaklik: d_sica = rand(d_sica), nem: d_nem = rand(d_nem)};
    //socket.compress(false).emit('testVerileri', veriler);
    console.log("gonderdi");

   
  },1000);
});

socket.on('event', function(data){

    console.log("event");
});

socket.on('disconnect', function(){

  clearInterval(timer);

  console.log("baglanti koptu");
});
