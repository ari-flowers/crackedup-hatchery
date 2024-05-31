import React, { useState } from 'react';
import './SubmitEggForm.css';

function SubmitEggForm({ onSubmit }) {
  const [shareLink, setShareLink] = useState('');
  const [viewGoal, setViewGoal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (shareLink && viewGoal) {
      onSubmit({ shareLink, viewGoal: parseInt(viewGoal, 10) });
      setShareLink('');
      setViewGoal('');
    }
  };

  return (
    <form className="submit-egg-form" onSubmit={handleSubmit}>
      <label>
        Share Link:
        <input
          type="url"
          value={shareLink}
          onChange={(e) => setShareLink(e.target.value)}
          required
        />
      </label>
      <label>
        View Goal:
        <input
          type="number"
          value={viewGoal}
          onChange={(e) => setViewGoal(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SubmitEggForm;
