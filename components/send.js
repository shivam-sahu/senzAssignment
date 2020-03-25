import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import io from 'socket.io-client';
import {URL} from '../utils';

class SendScreen extends Component {
  state = {
    receiverDeviceId: "",
    message: ""
  };
  componentDidMount(){

    this.socket = io(URL);
    this.socket.on("connect", () => {
      console.log("sender connected: ",this.socket.connected); // true
    });
  }
  onDeviceIdChange = value => {
    this.setState({ receiverDeviceId: value });
  };
  onMessageChange = value => {
    this.setState({ message: value });
  };
  onSendButtonClick =()=>{
    const { deviceId:senderDeviceId, publicKey:senderPublicKey, signature } = this.props.route.params;
    const messageDetails = {
      senderDeviceId,
      signature,
      senderPublicKey,
      receiverDeviceId:this.state.receiverDeviceId,
      message:this.state.message
    }
    this.socket.emit("send", messageDetails);
  }
  render() {
    return (
      <View>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="receivers Device Id"
            value={this.state.receiverDeviceId}
            onChangeText={text => {
              this.onDeviceIdChange(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="message"
            value={this.state.message}
            onChangeText={text => {
              this.onMessageChange(text);
            }}
          />
        </View>
        <View style={{ margin: 5, padding: 5 }}>
          <Button title="Send" onPress={()=>this.onSendButtonClick()} />
        </View>
      </View>
    );
  }
}

export default SendScreen;
