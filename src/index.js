import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Routes
import AppRoutes from './routes';
// Assets
import './css/index.css';
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDo0sGfSI-KezBTO8UjcnBpfw136aNQ1oY",
  authDomain: "proyecto2-c9030.firebaseapp.com",
  databaseURL: "https://proyecto2-c9030.firebaseio.com",
  projectId: "proyecto2-c9030",
  storageBucket: "proyecto2-c9030.appspot.com",
  messagingSenderId: "315438602113",
  appId: "1:315438602113:web:1425b03ace5242e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

render(
  <Router>
    <AppRoutes />
  </Router>,

  document.getElementById('root')
);
