const AESUtil=require("../utils/aes_utils");
const logger=require("../utils/winstonConfig");
const client=require("../client");
const express=require("express");
const app=express();
const port=process.env.port || 3000;
const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//Register Device 
const time=client.getTimestamp();
const regmsg = `SHARE #pubkey 234 @senz #time ${time} ^dev2 abc79141b050e`;
const aes=new AESUtil.AESUtils(sharedKey);  
const registerDevice=function(){
    logger.info("Registering Device");
    client.sendMessage(regmsg).then(function(retMsg){
        logger.info("<><><><><><><><><><><><><><<><>");
        logger.info(retMsg);
        logger.info("Ready to receive message ");
    
    })    
}
const receiveImage=function(){
    return client.receiveMessage().then(function(encImg){
    const decrptedBase64=aes.decrypt(encImg);
    console.log("decrptedBase64 ",decrptedBase64);
    client.sendMessage("").then(function() {
        logger.info(`UNSHARE #pubkey 234 @senz #time ${time} ^dev2 abc79141b050e`);
        logger.info("Unregistering the device");

    })
    logger.info("message -> ", decrptedBase64);
    return decrptedBase64;
    })
    .catch(err=>{throw err;});
}
app.get("/", function(req, res) {
    res.sendFile("receiveRegister.html", {
        root: __dirname
    })
})
app.get("/reg2", function(req, res) {
    registerDevice();
    res.sendFile("receiveAccept.html", {
        root: __dirname
    })
})
app.get("/rec2",async function(req, res) {
    const message =await receiveImage();
	const str = `message -> ${message}`;
    res.send(str);
})
app.listen(port, function(err) {
    if (err)
        throw err;
    else
    logger.info("App running on port "+port);
})
