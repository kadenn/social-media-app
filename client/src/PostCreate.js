import React, { useState } from 'react';
import axios from 'axios';

export default ({ user }) => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://0.0.0.0:4000/posts', {
      user,
      title,
    });

    window.location.reload();
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
