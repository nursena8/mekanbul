var mongoose=require("mongoose");
//var dbURI="mongodb://localhost/mekanbul";
var dbURI="mongodb+srv://sena:1456@mekanbul.hwalpwa.mongodb.net/mekanbul?retryWrites=true&w=majority"

mongoose.connect(dbURI);
function kapat(msg,callback){
    mongoose.connection.close(function(){
        console.log(msg);
    callback();
    });
    
}
process.on("SIGINT",function(){
    kapat("uygulama kapatıldı",function(){
        process.exit(0);
    });
});
mongoose.connection.on("connected",function(){
    console.log(dbURI+"adresindeki veritabanına bağlandı.");
});
mongoose.connection.on("disconnected",function(){
    console.log("balantı koptu");
});
mongoose.connection.on("errorr",function(){
    console.log("balantı hatası");
});

require("./mekansema");