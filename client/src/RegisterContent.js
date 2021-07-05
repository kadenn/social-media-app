import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { config } from './config';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="modal-content">
      <div className="modal-body">
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            type="password"
            className="form-control"
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
                  .createUserWithEmailAndPassword(email, password)
                  .catch(function (error) {
                    // Handle Errors here.
                    var errorMessage = error.message;
                    alert(errorMessage);
                  });
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
