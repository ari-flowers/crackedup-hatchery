import React, { useState, useEffect } from 'react';
import './SubmitEggForm.css';

function SubmitEggForm({ onSubmit, disabled, reset }) {
  const [shareLink, setShareLink] = useState('');
  const [viewGoal, setViewGoal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (shareLink && viewGoal) {
      onSubmit({ share_link: shareLink, view_goal: viewGoal });
    }
  };

  useEffect(() => {
    if (reset) {
      setShareLink('');
      setViewGoal('');
    }
  }, [reset]);


  return (
    <form className="submit-egg-form" onSubmit={handleSubmit}>
      <label>
        Share Link:
        <input
          type="url"
          value={shareLink}
          onChange={(e) => setShareLink(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <label>
        View Goal:
        <input
          type="number"
          value={viewGoal}
          onChange={(e) => setViewGoal(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <button type="submit" disabled={disabled}>Submit</button>
    </form>
  );
}

export default SubmitEggForm;
