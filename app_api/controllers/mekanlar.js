var mongoose=require("mongoose");
var Mekan =mongoose.model("mekan");
var cevrimler=(function(){
    var dunyaYariCap=6371;
    var radyan2Kilometre=function(radyan){
        return parseFloat(radyan*dunyaYariCap);
    };
    var kilometre2Radyan=function(mesafe){
        return parseFloat(mesafe/dunyaYariCap);
    };
    return{
        radyan2Kilometre:radyan2Kilometre,
        kilometre2Radyan:kilometre2Radyan,

    };
})();

const cevapOlustur=function(res,status,content){
res.status(status).json(content);
}

const mekanlariListele=async(req,res)=>{
    var boylam=parseFloat(req.query.boylam);
    var enlem=parseFloat(req.query.enlem);
    var koordinat={
        type:"point",
        coordinates: [enlem,boylam],
        
    };
    var geoOption={
        distanceField:"mesafe",
        spherical:true,

    };
    if((!enlem&&boylam!==0)||(!enlem&&boylam!==0)){
cevapOlustur(res,404,{
    "hata":"boylam ve enlem zorunlu parametrelerdir",
});
return;

    }try{
        const sonuc=await Mekan.aggregate([
            {
                $geoNear:{
                    near:koordinat,
                    ...geoOption,
    
                },
            },
        ]);
        const mekanlar=sonuc.map((mekan)=>{
            return{
                mesafe:cevrimler.kilometre2Radyan(mekan.mesafe),
                ad:mekan.ad,
                adres:mekan.adres,
                puan:mekan.puan,
                imkanlar:mekan.imkanlar ,
                _id:mekan._id,

            };
        });
        cevapOlustur(res,200,mekanlar);
    }
    catch(e){
        cevapOlustur(res,404,   e);
    }
};
const mekanEkle=function(req,res){
  Mekan.create({
 
    ad:req.body.ad,
    adres:req.body.adres,
    imkanlar:req.body.imkanlar.split(","),
    koordinat:[parseFloat(req.body.enlem),parseFloat(req.body.enlem)],
    saatler:[{
        gunler:req.body.gunler1,
        acilis:req.body.acilis1,
        kapanis:req.body.kapanis1,
        kapali:req.body.kapali1
    },{
        gunler:req.body.gunler2,
        acilis:req.body.acilis2,
        kapanis:req.body.kapanis2,
        kapali:req.body.kapali2



    }
]




  },function(hata,mekan){
    if(hata){
        cevapOlustur(res,400,hata);
    }
    else{
        cevapOlustur(res,200,mekan);
    }
  });



  

};
const mekanSil=function(req,res){
   var mekanid=req.params.mekanid;
   if(mekanid){
    Mekan.findByIdAndRemove(mekanid).exec(function(hata,gelenMekan){
        if(hata){
            cevapOlustur(res,404,hata);
            return;

        }
        cevapOlustur(res,200,{"durum":"mekan silindi","silinen mekan":gelenMekan.ad});



   });
   }
};
   
const mekanGetir=function(req,res){
    if (req.params&&req.params.mekanid){
        Mekan.findById(req.params.mekanid)
    .exec(function(hata,mekan){
        if(!mekan){
            cevapOlustur(res,404,{"hata":"böyle bir mekan yo"});   
        }
        else if (hata){
            cevapOlustur(res,404,{"hata":hata});}
        else {
            cevapOlustur(res,200,mekan);
        }
    });
    }else{
        cevapOlustur(res,404,{"hata":"istekte mekanid yok"});
    }
         
    
};
const mekanGuncelle=function(req,res){
    if(!req.params.mekanid){
        cevapOlustur(res,404,{mesaj:"bulunamadı mekanidgerekli"});
        return;

    }
    Mekan.findById(req.params.mekanid).select("yorumlar puan")
    .exec(function(hata,gelenMekan){
        if(!gelenMekan){cevapOlustur(res,404,hata);
            return;}
            gelenMekan.ad=req.body.ad;
            gelenMekan.adres=req.body.adres;
            gelenMekan.imkanlar=req.body.imkanlar.split(",");
            gelenMekan.koordiant=[parseFloat(req.body.enlem),parseFloat(req.body.boylam)];
            gelenMekan.saatler=[
                {
                    gunler:req.body.gunler1,
                    acilis:req.body.acilis1,
                    kapanis:req.body.kapanis1,
                    kapali:req.body.kapali1,

                },{
                    gunler:req.body.gunler2,
                    acilis:req.body.acilis2,
                    kapanis:req.body.kapanis2,
                    kapali:req.body.kapali2,

                }
            ];
            gelenMekan.save(function(hata,mekan){
                if(hata){cevapOlustur(res,404,hata);}else{cevapOlustur(res,200,mekan);}
            });

    });} ;

module.exports={
    mekanEkle,
    mekanGetir,
    mekanGuncelle,
    mekanSil,
    mekanlariListele
}













