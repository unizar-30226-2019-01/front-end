import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import NewRoomForm from './NewRoomForm'
import jwt_decode from 'jwt-decode'


import { tokenUrl, instanceLocator, key } from './config'
import '../css/style.css';

class Chat extends React.Component {
    
    constructor() {
        super()
        this.state = {
            roomId: null,
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
        this.createRoom = this.createRoom.bind(this)
    } 
    
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)

        const ChatkitS = require('@pusher/chatkit-server');

        //Servidor
        const chatkit = new ChatkitS.default({
          instanceLocator: instanceLocator,
          key: key,
        })

        //Obtenemos el usuario, si no existe lo crea
        chatkit.getUser({
          id: decoded.identity.login,
        })
          .then(user => console.log('Usuario encontrado: ', user))
          .catch(chatkit.createUser({
              id: decoded.identity.login,
              name: decoded.identity.nombre,
            })
              .then(() => {
                console.log('Usuario creado correctamente');
              }).catch((err) => {
                console.log(err);
              }))

        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: decoded.identity.login,
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.getRooms()
        })
        .catch(err => console.log('Error en la conexion: ', err))
    }
    
    getRooms() {
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
        })
        .catch(err => console.log('Error obteniendo salas: ', err))
    }
    
    subscribeToRoom(roomId) {
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
                }
            }
        })
        .then(room => {
            this.setState({
                roomId: room.id
            })
            this.getRooms()
        })
        .catch(err => console.log('Error accediendo a la sala: ', err))
    }
    
    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }
    
    createRoom(name) {
        //Buscamos si existe el usuario
        var existe = 0;
        const ChatkitS = require('@pusher/chatkit-server');
        const chatkit = new ChatkitS.default({
          instanceLocator: instanceLocator,
          key: key,
        })
        chatkit.getUser({
          id: name,
        })
          .then(existe=1)
          .catch(console.log("No existe el usuario"))
        //Si existe el usuario, creamos una sala con él
        if (existe==1){
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            var nombreSala;
            var name1 = decoded.identity.login;
            if (name1 < name){
                nombreSala = name1 + "-" + name;
            }
            else{
                nombreSala = name + "-" + name1;
            }
        this.currentUser.createRoom({
            name: nombreSala,
            private: true,
            addUserIds: [name],
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log('Error creando la sala: ', err))
        }
    }
    
    render() {
        return (
            <div className="chat">
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId} />
                <MessageList 
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage} />
                <NewRoomForm createRoom={this.createRoom} />
            </div>
        );
    }
}

export default Chat