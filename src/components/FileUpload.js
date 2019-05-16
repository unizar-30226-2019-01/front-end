import React, { Component } from 'react';
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBXsmEEHvGiRwxeMbAO4AejNexD0iCHn_s",
    authDomain: "proyectosoftware-2397d.firebaseapp.com",
    databaseURL: "https://proyectosoftware-2397d.firebaseio.com",
    projectId: "proyectosoftware-2397d",
    storageBucket: "proyectosoftware-2397d.appspot.com",
    messagingSenderId: "382506671393",
    appId: "1:382506671393:web:af9c6a6744e52da2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


class FileUpload extends Component {
    constructor () {
        super();
        this.state = {
           uploadValue: 0,
           picture: null
        }
      }

    handleOnChange (event) {
        const file = event.target.files[0]
        file.name="jajajajajajajjja"
        const storageRef = firebase.storage().ref(`fotos/${file.name}`)
        const task = storageRef.put(file)

        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                uploadValue: percentage
            })
          }, (error) => {
            // Si ha ocurrido un error aquí lo tratamos
            console.error(error.message)
        }, () => {
            this.setState({
              picture: task.snapshot.downloadURL
            })
          })
    }
    
    render() {
      return (
        <div>
          <progress value={this.state.uploadValue} max='100'></progress>
          <br />
          <input type='file' onChange={this.handleOnChange.bind(this)}/>
          <br />
          <img width='90' src={this.state.picture} />
        </div>
      )
    }
  }

  export default FileUpload