import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import io from 'socket.io-client';
import { URL } from "../utils";

class ReceiveScreen extends Component {
  state={
    senderDeviceId:'',
    receivedMessage:null,
    status:"Unregistered"
  }
  componentDidMount(){
    this.socket = io(URL);
    this.socket.on("connect", () => {
      console.log("receiver connected: ",this.socket.connected); // true
    });
    this.socket.on('receive',msg=>{
      this.setState({receivedMessage:msg, status:"Message Received"});
    })
  }
  onDeviceIdChange = value => {
    this.setState({ senderDeviceId: value });
  };
  onReceiveButtonClick=()=>{
    const { deviceId: receiverDeviceId, publicKey: receiverPublicKey, signature } = this.props.route.params;
    const receiverDetails = {
      receiverDeviceId,
      signature,
      receiverPublicKey,
      senderDeviceId: this.state.senderDeviceId
    }
    this.setState({status:"Registered"});
    this.socket.emit("receive", receiverDetails);
  }
  render() {
    return (
      <View>
        <View>
          <TextInput autoCapitalize="none" placeholder="sender device Id" value ={this.state.senderDeviceId} onChangeText={(text)=>{this.onDeviceIdChange(text)}} />
        </View>
        <View style={{ margin: 5, padding: 5 }}>
          <Button title="Start Receiving" onPress={()=>this.onReceiveButtonClick() }/>
        </View>
        <View style={{margin:5, padding:5}}>
          <Text>Status : {this.state.status}</Text>

          {
            this.state.status === "Unregistered" ? null :
            (
              this.state.receivedMessage ? <Text>"Message -> "{this.state.receivedMessage}</Text> 
              : 
              <Text>Waiting for sender to send message</Text>
              )
          }
        </View>
      </View>
    );
  }
}

export default ReceiveScreen;
