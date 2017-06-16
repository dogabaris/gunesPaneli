# gunesPaneli

### Gözlem Paneli

![Gözlem Paneli](https://github.com/dogabaris/gunesPaneli/blob/master/gunluk.jpg)

### Panel Yönetimi

![Panel Yönetimi](https://github.com/dogabaris/gunesPaneli/blob/master/panelyonetimi.jpg)

### İstatistik Paneli

![İstatistik Paneli](https://github.com/dogabaris/gunesPaneli/blob/master/istatistik.jpg)

Mongodb GunOzetleri5 ismiyle kullanılıyor.

node paketlerini indirmek için proje dizininde açılan terminale aşağıdaki kod girilmelidir.

```
npm install
```

node paketleri yüklendikten sonra, mongo serveri çalıştırılır. Geliştirme ortamımızda herhangi bir terminalde aşağıdaki kod yazılır.

```
sudo mongod
```

örnek veritabanını mongodb'ye aktarmak için (gunesPaneli'nin indirildiği klasör)/db/stringDatabase yolu kullanılarak açılan terminalde 

```
mongorestore -d GunesPaneli5 -c paneldata paneldata.json
```
```
mongorestore -d GunesPaneli5 -c panel panel.json
```

komutları girilmelidir.

projeyi çalıştırmak için proje dizininde aşağıdaki kod girilmelidir.

```
sudo node app.js
```

proje 

http://localhost:1337

dizininde çalışıyor olacaktır.
