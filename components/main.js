import React, {Component} from 'react'
import {Text, View, TextInput, Button} from 'react-native';


class Main extends Component {
  state = {
    deviceId: "",
    signature: "",
    publicKey: ""
  };
  onDeviceIdChange = value => {
    this.setState({ deviceId: value });
  };
  onSignatureChange = value => {
    this.setState({ signature: value });
  };
  onPublicKeyChange = value => {
    this.setState({ publicKey: value });
  };
  render() {
    return (
      <View>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="device Id"
            value={this.state.deviceId}
            onChangeText={text => {
              this.onDeviceIdChange(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="public key"
            value={this.state.publicKey}
            onChangeText={text => {
              this.onPublicKeyChange(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="signature"
            value={this.state.signature}
            onChangeText={text => {
              this.onSignatureChange(text);
            }}
          />
        </View>
        <View style={{margin:5, padding:5}} >
          <Button
            title="Send"
            onPress={() =>
              this.props.navigation.navigate("Send", {
                deviceId: this.state.deviceId,
                signature: this.state.signature,
                publicKey: this.state.publicKey
              })
            }
          />
        </View>
        <View style={{ margin: 5, padding: 5 }}>
          <Button
            title="Receive"
            onPress={() =>
              this.props.navigation.navigate("Receive", {
                deviceId: this.state.deviceId,
                signature: this.state.signature,
                publicKey: this.state.publicKey
              })
            }
          />
        </View>
      </View>
    );
  }
}

export default Main;