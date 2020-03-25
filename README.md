## senzAssignment

#### React-Native Mobile app for transfer of messages through senz server.

Recommendation before proceding :- 
You should be familar with the [scorelab/senz](https://github.com/scorelab/senz) project and also have sent queries to differnet sample client in the [senz-client-samples](https://github.com/scorelab/senz/tree/master/senz-client-samples) folder.
### Installation Instructions:-
1. Clone the repository into your local machine and go to the project directory.
```bash
cd senzAssignment
```
2. Now install dependencies using command.
```bash
npm run install-dep
```
3. Now run the [senz-switch](https://github.com/scorelab/senz/tree/master/senz-switch) server from the Scorelab/senz repository.
Note:- Make sure that mongo db is installed and running in your local machine.

4. Now run a tunneling service such as [ngrok](https://ngrok.com/) for port 3003 in one terminal and copy the url given by ngrok and replace the url in the utils file.
Eg. for ubuntu
```bash
./ngrok http 3003
```
5. Now run the backend in one terminal.
```bash
npm run backend
```
6. Now run the app :-
In one terminal (for running metro server)
```bash
react-native start
```
In another terminal (for installing and opening the app)
```bash
react-native run-android
```
Note:- Refer to this [guide](https://reactnative.dev/docs/getting-started) for installing and setting up react-native cli in your local machine.

7. Now to see sent response from the mobile client run the javascript receiver module in your desktop.
Note:- Default value of the receiver deviceId is dev2 and public key is 234.Feel free to change it in the file [receiver.js](./javascript/transfer/receiver.js).
```bash
npm run receiver
```
For sending message to the mobile run
```bash
npm run sender
```
Note:- Default value of the sender deviceId is dev1 and public key is 123 .Feel free to change it in the file [sender.js](./javascript/transfer/sender.js).
