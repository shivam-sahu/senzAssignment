const net = require("net");
const socket = new net.Socket();
const AESUtils = require("./utils/AesUtils");

socket.connect(2552, "localhost", function() {
  console.log("Client: Connected to server");
});

const time = Date.now();
const sharedKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const aes = new AESUtils(sharedKey);

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
    console.log(senData);
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

module.exports = {registeringDevice};
