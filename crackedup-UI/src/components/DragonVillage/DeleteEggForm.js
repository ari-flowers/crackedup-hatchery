import React, { useState } from 'react';

function DeleteEggForm({ onSubmit }) {
  const [shareLink, setShareLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(shareLink);
    setShareLink('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter share link to delete"
        value={shareLink}
        onChange={(e) => setShareLink(e.target.value)}
        required
      />
      <button type="submit">Delete Egg</button>
    </form>
  );
}

export default DeleteEggForm;
