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
                console.log(email);
                console.log(password);
                firebase.auth().createUserWithEmailAndPassword(email, password);
              }}
            >
              Register
            </button>
          </div>
        </FirebaseAuthProvider>
      </div>
    </div>
  );
};
