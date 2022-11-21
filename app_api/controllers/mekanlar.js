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
    cevapOlustur(res,200,{"durum":"basarili"});

}
const mekanSil=function(req,res){
    cevapOlustur(res,200,{"durum":"basarili"});
}
   
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
const mekanGuncelle=function(reg,res){
    cevapOlustur(res,200,{"durum":"basarili"});
}
module.exports={
    mekanEkle,
    mekanGetir,
    mekanGuncelle,
    mekanSil,
    mekanlariListele
}













