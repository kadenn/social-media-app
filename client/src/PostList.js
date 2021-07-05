import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default ({ user }) => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://0.0.0.0:4002/posts');

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <p style={{color: "rgba(0,0,0,0.5)"}}>Created By: {post.user.email.split('@')[0]}</p>
          <CommentList comments={post.comments} />
          {user.uid ? <CommentCreate postId={post.id} user={user} /> : null}
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
