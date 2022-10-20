var express = require('express');
var router = express.Router();

const anaSayfa=function(req, res, next) {
    res.render('anasayfa', {
       "baslik": "Anasayfa",
       "sayfaBaslik":{
         "siteAd":"MeakanBul",
         "slogan":"Civardaki mekanları keşfet"
       },
       "mekanlar":[
         {
           "ad":"Sturbucks",
           "adres":"SDÜ Batı Kampüsü",
           "puan":"4",
           "imkanlar":["Dünya kahvesi","kekler","pastalar"],
           "mesafe":"2km"
         }
         ,
         {
          "ad":"Gloria Jeans",
          "adres":"iyaş",
          "puan":"3",
          "imkanlar":["kahve","cay","pasta"],
          "mesafe":"10km"
         }
       ] 
     }
     );
  }

  const mekanBilgisi=function(req, res, next) {
    res.render('mekanbilgisi',
     { "baslik": "Mekan bilgisi",
      "mekanBaslik":"Starbucks",
      "mekanDetay":{
        "ad":"Starbucks",
        "adres":"centrum garden",
        "puan":"4",
        "imkanlar":["çaylar","pastalar"],
        "koordinatlar":{
          "enlem":"37.7",
          "boylam":"30.5"
          },

        "saatler":[
          {
            "gunler":"pazartesi-cuma",
            "acilis":"9:00",
            "kapanis":"22:00",
            "kapali":false
          },
          {
            "gunler":"cumartesi-pazar",
            "acilis":"9:00",
            "kapanis":"22:00",
            "kapali":false
          }
        ],
        
          "yorumlar":[
            {
              "yorumYapan":"Sena",
              "puan":"3",
              "tarih":"20 eki 2022",
              "yorumMetini":"Süper"
            },
            {
              "yorumYapan":"isimsiz",
              "puan":"5",
              "tarih":"20 eki 2022",
              "yorumMetini":"Süper"
            }
          ]
        

      }
     });
  }

  const yorumEkle=function(req, res, next) {
    res.render('yorumekle', { title: 'Yorum ekle' });
  }

  module.exports={
   anaSayfa,
   mekanBilgisi,
   yorumEkle

  }