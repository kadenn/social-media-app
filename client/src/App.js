import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from '@react-firebase/auth';
import { config } from './config';

export default () => {
  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div className="container">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <ul class="nav navbar-nav navbar-right">
              <IfFirebaseAuthed>
                {() => {
                  var user = firebase.auth().currentUser;
                  if (user != null) {
                    console.log(user.email);
                    console.log(user.uid);
                  }
                  return (
                    <div>
                      <button
                        id="login"
                        class="btn"
                        onClick={() => {
                          firebase.auth().signOut();
                        }}
                        style={{
                          position: 'absolute',
                          right: '0px',
                          fontSize: '25px',
                          top: '5px',
                        }}
                      >
                        {user.email} - Sign Out
                      </button>
                    </div>
                  );
                }}
              </IfFirebaseAuthed>
              <IfFirebaseUnAuthed>
                {() => {
                  return (
                    <div>
                      <Popup
                        trigger={
                          <button
                            id="login"
                            class="btn"
                            style={{
                              position: 'absolute',
                              right: '0px',
                              fontSize: '30px',
                              top: '5px',
                            }}
                          >
                            Login
                          </button>
                        }
                      >
                        <LoginContent />
                      </Popup>
                      <Popup
                        trigger={
                          <button
                            id="register"
                            class="btn"
                            style={{
                              position: 'absolute',
                              right: '100px',
                              fontSize: '30px',
                              top: '5px',
                            }}
                          >
                            Register
                          </button>
                        }
                        style={{ float: 'right' }}
                      >
                        <RegisterContent />
                      </Popup>
                    </div>
                  );
                }}
              </IfFirebaseUnAuthed>
            </ul>
          </div>
        </nav>

        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </FirebaseAuthProvider>
  );
};
