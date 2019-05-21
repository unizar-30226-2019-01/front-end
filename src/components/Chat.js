import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import RoomList from './RoomList'
import jwt_decode from 'jwt-decode'
import Button from 'react-bootstrap/Button';


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
            if (this.props.location.datos !== null && this.props.location.datos !== undefined){
                this.inicializar_chat()
            }
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

    salir(roomId){
        if (roomId !== null && roomId !== undefined){
        this.currentUser.leaveRoom({ roomId: roomId })
          .then(room => {
            console.log(`Sala abandonada-> ID: ${room.id}`)
          })
          .catch(err => {
            console.log(`Error abandonando la sala ${roomId}: ${err}`)
          })
        window.location.reload();
        }
        else{
            window.alert("Seleccione una conversación para abandonarla.")
        }
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
    inicializar_chat(){
        //Buscamos si existe el vendedor
        var existe = 0;
        const ChatkitS = require('@pusher/chatkit-server');
        const chatkit = new ChatkitS.default({
          instanceLocator: instanceLocator,
          key: key,
        })
        chatkit.getUser({
          id: this.props.location.datos.vendedor,
        })
          .then(existe=1)
          .catch(console.log("El vendedor no esta registrado en los Chats"))
        if (existe==1){
            var nombre_sala= this.props.location.datos.articulo + "-" + this.props.location.datos.vendedor;
            //Comprobamos si ya estamos unidos a la sala
            this.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.currentUser.rooms
                })
                var joined = false;
                var i;
                for (var indice in this.state.joinedRooms) {
                    if (this.state.joinedRooms[indice].name == nombre_sala){
                        joined = true;
                        i = indice;
                    }
                }
                //Si estamos unidos, nos suscribimos
                if (joined){
                    this.subscribeToRoom(this.state.joinedRooms[i].id);
                }
                //Si no, la creamos y unimos al vendedor
                else{
                        this.currentUser.createRoom({
                          name: nombre_sala,
                          addUserIds: [this.props.location.datos.vendedor],
                          private: true, //Para que no aparezca en joinable.
                        }).then(room => {
                          //Nos suscribimos
                          this.subscribeToRoom(room.id);
                          console.log(`Creado y suscrito al chat con ID ${room.id}`);
                        })
                        .catch(err => {
                          console.log(`Error: ${err}`)
                        })
                }
            })
            .catch(err => console.log('Error obteniendo salas: ', err))
        }
    }

    render() {
        return (
            <div>
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
            </div>
                <Button 
                   className="btn btn-danger"
                   onClick={() => this.salir(this.state.roomId)}>
                    Salir del chat seleccionado
                </Button>
                <br />
                <Button 
                   className="btn btn-primary"
                   href="/perfil">
                    Volver
                </Button>
            </div>
        );
    }
}

export default Chat