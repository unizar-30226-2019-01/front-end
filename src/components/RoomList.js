import React from 'react'
import jwt_decode from 'jwt-decode'

class RoomList extends React.Component {

    obtenerNombre(room){
        //Obtengo el usuario
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        var user = decoded.identity.login;
        //Obtengo el nombre de la sala
        var nombres = room.split("-");
        if (nombres[0] == user){
            return (nombres[1]);
        }
        else{
            return (nombres[0]);
        }
    }

    render () {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id);
        let name;
        return (
            <div className="rooms-list">
                <ul>
                <h3>Tus chats:</h3>
                    {orderedRooms.map(room => {
                        const active = room.id === this.props.roomId ? 'active' : '';
                        return (
                            <li key={room.id} className={"room " + active}>
                                <a
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                    href="#">
                                    #{name = this.obtenerNombre(room.name)}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList