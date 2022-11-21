var mongoose=require("mongoose");
var yorumSema=new mongoose.Schema({
    yorumYapan:{type:String,required:true},
    yorumMetni:{type:String,required:true},
    puan:{type:Number,default:0,min:0,max:5},
    tarih:{type:Date,default:Date.now}
});
var saatSema=new mongoose.Schema({
    gunler:{type:String,required:true},
    acilis:String,
    kapanis:String,
    kapali:{type:Boolean},
});
var mekanSema=new mongoose.Schema({
    ad:String,
    adres:String,
    puan:Number,
    imkanlar:[String],
    koordinat:{type:[Number],index:"2dsphere"},
    saatler:[saatSema],
    yorumlar:[yorumSema]
});
mongoose.model("mekan",mekanSema,"mekanlar");
