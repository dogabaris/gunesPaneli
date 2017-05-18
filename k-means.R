# Pınar Adıgüzel

library(e1071) # kmeans çalıştır
library(data.table)
library(curl)
library(RMongo) 
library(RJSONIO) 

library(ggplot2) # grafik

mongo <- mongoDbConnect(dbName = "yeniveri", host="localhost", port = "27017") 

deneme <- dbGetQuery(mongo, "veri", "",0,50000) #nosql sorgu üret

veriCluster <- kmeans(deneme[,c(26,28,50,52,39)], 3, nstart = 40) 
veriCluster #yazdırdı
veriCluster$cluster <- as.factor(veriCluster$cluster) 
ggplot(deneme, aes(IntSolIrr, TmpMdul.C, color = veriCluster$cluster)) + geom_point() 

exportJson <- toJSON(veriCluster$centers)

exportJson

write(exportJson, "test.json")

mydat <- fread('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22%C4%B0zmit%2C%20TR%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
head(mydat)

mydat$V38

sicF <- as.numeric(unlist(strsplit(mydat$V38,":\""))[2]) #yahoodan alınan izmit sıcaklık verisi F ile
sicF
sicC <- (sicF[1]-32)*5/9 # Celcius olarak işlenebilir sıcaklık

grup1sic <- veriCluster$centers[4]
grup2sic <- veriCluster$centers[5]
grup3sic <- veriCluster$centers[6]

enyuksek <- max(grup1sic,grup2sic,grup3sic)
endusuk <- min(grup1sic,grup2sic,grup3sic)

if(enyuksek < sicC){
  cat("Bugünün sıcaklık verilerine göre elektrik üretim potansiyeli çok yüksek!")
  write("Bugünün sıcaklık verilerine göre elektrik üretim potansiyeli çok yüksek!", "sonuc.txt")
}

if(endusuk > sicC){
  cat("Bugünün sıcaklık verilerine göre elektrik üretim potansiyeli çok düşük!")
  write("Bugünün sıcaklık verilerine göre elektrik üretim potansiyeli çok düşük!", "sonuc.txt")
}

if(endusuk < sicC && enyuksek > sicC){ 
  cat("Bugünün sıcaklık verilerine göre elektrik üretim potansiyeli normal seviyede!")
  write("Bugünün sıcaklık verilerine göre elektrik üretim potansiyeli normal seviyede!", "sonuc.txt")
}



