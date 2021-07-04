import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { config } from './config';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div class="modal-content">
      <div class="modal-body">
        <div class="form-group">
          <label class="control-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div class="form-group">
          <label class="control-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <FirebaseAuthProvider {...config} firebase={firebase}>
          <div>
            <button
              type="submit"
              onClick={() => {
                firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                  });
              }}
            >
              Login
            </button>
          </div>
        </FirebaseAuthProvider>
      </div>
    </div>
  );
};
