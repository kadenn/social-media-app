import React from 'react';

export default ({ comments }) => {
  if (!comments) {
    return '';
  }
  const renderedComments = Object.values(comments).map((comment) => {
    let content;

    if (comment.status === 'approved') {
      content = comment.content;
    }

    if (comment.status === 'pending') {
      content = 'This comment is awaiting moderation';
    }

    if (comment.status === 'rejected') {
      content = 'This comment has been rejected';
    }

    return <li key={comment.id}> {comment.user.email.split('@')[0]}: {content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
