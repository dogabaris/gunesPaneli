# gunesPaneli

Mongodb GunOzetleri2 ismiyle kullanılıyor.

node paketlerini indirmek için proje dizininde açılan terminale aşağıdaki kod girilmelidir.

```
npm install
```

node paketleri yüklendikten sonra, mongo serveri çalıştırılır. Geliştirme ortamımızda herhangi bir terminalde aşağıdaki kod yazılır.

```
sudo mongod
```

örnek veritabanını mongodb'ye aktarmak için (gunesPaneli'nin indirildiği klasör)/db/solarPanel yolu kullanılarak açılan terminalde 

```
mongorestore -d GunesPaneli2 -c paneldata paneldatas.bson
```
```
mongorestore -d GunesPaneli2 -c panel panels.bson
```

komutları girilmelidir.

projeyi çalıştırmak için proje dizininde aşağıdaki kod girilmelidir.

```
sudo node app.js
```

proje 

http://localhost:1337

dizininde çalışıyor olacaktır.
