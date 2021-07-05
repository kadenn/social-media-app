import React, { useState } from 'react';
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
  const [user, setUser] = useState({});

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav navbar-right">
              <IfFirebaseAuthed>
                {() => {
                  var tempUser = firebase.auth().currentUser;
                  if (tempUser != null) {
                    setUser(tempUser);
                  }
                  return (
                    <div>
                      <button
                        id="login"
                        className="btn"
                        onClick={() => {
                          firebase.auth().signOut();
                          window.location.reload();
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
                            className="btn"
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
                            className="btn"
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
        {user.uid ? (
          <div>
            <h1>Create Post</h1>
            <PostCreate user={user} />
            <hr />
          </div>
        ) : null}
        <h1>Posts</h1>
        <PostList user={user} />
      </div>
    </FirebaseAuthProvider>
  );
};
