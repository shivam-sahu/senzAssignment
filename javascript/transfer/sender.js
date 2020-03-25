const AESUtil=require("../utils/aes_utils");
const logger = require("../utils/winstonConfig");
const client=require("../client");
const express=require("express");
const app=express();
const port=process.env.port || 3001;
const sharedKey=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
//Register Device 
logger.info("Registering Device");
const time=client.getTimestamp();
const regmsg=`SHARE #pubkey 123 @senz #time ${time} ^dev1 abc79141b050e`;

const byteString = "Hello mobile"
//Encrypt using AES Crypto
const aes=new AESUtil.AESUtils(sharedKey);
const encryptedByteString=aes.encrypt(byteString);
//Send Message
const senmsg = `DATA $image ${encryptedByteString} @dev2 #time ${time} ^dev1 abc79141b050e`
const registeringDevice=function(regmsg)
{
    client.sendMessage(regmsg).then(function(registered){
        logger.info(registered);
    })
	.catch(err=>{throw err});
}
const sendingMessage=function(senmsg){
    client.sendMessage(senmsg).then(function(senData){
        logger.info(senData);
        client.sendMessage(`UNSHARE #pubkey 123 @senz #time ${time} ^dev1 abc79141b050e`).then(function(registered){
            logger.info(registered);
        })
	    .catch(err=>{throw err});
    })
}

app.get("/",function(req,res){
    res.sendFile("sendRegister.html",{root:__dirname});
})
app.get("/reg1",function(req,res){
    registeringDevice(regmsg);
    res.sendFile("sendSend.html",{root:__dirname})
})
app.get("/sen1",function(req,res){
    sendingMessage(senmsg);
    res.send("Message Sent !!");
})
app.listen(port,function(err){
    if(err)
    throw err;
    logger.info(`server running on port ${port}`);
})
