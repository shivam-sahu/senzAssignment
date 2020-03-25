//sender.js
const senz = require("senz");
const net = require("net");
const socket = new net.Socket();
const aesjs = require("aes-js");
const base64js = require("base64-js");
const ab2str = require("arraybuffer-to-string");

socket.connect(2552, "localhost", function() {
  console.log("Client: Connected to server");
});

const time = Date.now();
///// ksdjfkl asjdkfljal

class AESUtils {
  constructor(key) {
    this.bs = 32;
    this.key = key;
  }
  encrypt(raw) {
    //Message should be a multiple of 16 bytes
    raw = this.pad(raw);
    // The initialization vector (must be 16 bytes)
    const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    //Convert text to bytes
    const textBytes = aesjs.utils.utf8.toBytes(raw);
    const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, iv);
    //Encrypt the message
    const encryptedBytes = aesCbc.encrypt(textBytes);
    const encryptedBytesBase64 = base64js.fromByteArray(encryptedBytes);
    return encryptedBytesBase64;
  }
  decrypt(enc) {
    const iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const encryptedBytes = base64js.toByteArray(enc);
    const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, iv);
    //Get the decrypted bytes
    const decryptedBytes = aesCbc.decrypt(encryptedBytes);
    //Convert the decrypted bytes to text
    const uint8 = new Uint8Array(decryptedBytes);
    const decryptedText = ab2str(uint8);
    return this.unpad(decryptedText);
  }
  ord(str) {
    return str.charCodeAt(0);
  }

  pad(s) {
    let fins = "";
    const num = this.bs - (s.length % this.bs);
    for (let i = 0; i < num; i++) {
      fins = fins + String.fromCharCode(this.bs - (s.length % this.bs));
    }
    return s + fins;
  }
  unpad(s) {
    return s.substr(0, s.length - this.ord(s.substr(s.length - 1)));
  }
}

const sendMessage = function(msg) {
  return new Promise(function(resolve) {
    socket.write(msg);
    socket.on("data", function(data) {
      data = data.toString("utf8");
      resolve(data);
    });
    socket.on("error", function(e) {
      logger.error(`Error Message: ${e}`);
    });
  });
};

const sendingMessage = function(messageDetails) {
  const {
    senderDeviceId,
    senderPublicKey,
    signature,
    receiverDeviceId,
    message
  } = messageDetails;
  const encryptedData = aes.encrypt(message);
  const newQuery = `DATA $image ${encryptedData} @${receiverDeviceId} #time ${time} ^${senderDeviceId} ${signature}`;
  sendMessage(newQuery).then(function(senData) {
    console.log(" kashdfklj", senData);
    sendMessage(
      `UNSHARE #pubkey ${senderPublicKey} @senz #time ${time} ^${senderDeviceId} ${signature}`
    ).then(function(registered) {
      console.log(registered);
    });
  });
};

const registeringDevice = function(messageDetails) {
  const {
    senderDeviceId,
    senderPublicKey,
    signature,
    receiverDeviceId,
    message
  } = messageDetails;
  var shareQuery = `SHARE #pubkey ${senderPublicKey} @senz #time ${time} ^${senderDeviceId} ${signature}`;
  sendMessage(shareQuery).then(function(registered) {
    console.log(registered);
  });
  sendingMessage(messageDetails);
};

const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const aes = new AESUtils(sharedKey);

//////adsjf;kljasdf

const registerSender = messageDetails => {
  // console.log(messageDetails)
  const {
    senderDeviceId,
    senderPublicKey,
    signature,
    receiverDeviceId,
    message
  } = messageDetails;
  var shareQuery = `SHARE #pubkey ${senderPublicKey} @senz #time ${time} ^${senderDeviceId} ${signature}`;
  senz.query
    .sendQuery(socket, shareQuery)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      throw err;
    });
};
// const sendMessage= messageDetails =>{
//   const {
//     senderDeviceId,
//     senderPublicKey,
//     signature,
//     receiverDeviceId,
//     message
//   } = messageDetails;
//    const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
//    const aes = new senz.aesUtil.AESUtils(sharedKey);
//    const encryptedData = aes.encrypt(message);
//   const newQuery = `DATA $image ${encryptedData} @${receiverDeviceId} #time ${time} ^${senderDeviceId} ${signature}`;
//   senz.query.sendQuery(socket, newQuery).then(res => {
//     console.log(res);
//     const newQuery2 = `UNSHARE #pubkey ${senderPublicKey} @senz #time ${time} ^${senderDeviceId} ${signature}`;
//     senz.query.sendQuery(socket, newQuery2).then(res => {
//       console.log(res);
//     });
//   });
// }

module.exports = {
  registerSender,
  sendMessage,
  registeringDevice,
  sendingMessage
};


// Receiver.js
