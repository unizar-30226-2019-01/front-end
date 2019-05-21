import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Routes
import AppRoutes from './routes';
// Assets
import './css/index.css';
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

render(
  <Router>
    <AppRoutes />
  </Router>,

  document.getElementById('root')
);
