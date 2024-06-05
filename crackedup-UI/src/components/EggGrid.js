import React from 'react';

function EggGrid({ eggs, handleEggClick, DEFAULT_IMAGE_URL, showViewGoal }) {
  return (
    <div className="egg-grid">
      {eggs.map((egg, index) => (
        <div key={egg.id || index} className="egg">
          <img
            src={egg.image}
            alt="Egg"
            onClick={() => handleEggClick(egg)}
            onError={(e) => e.target.src = DEFAULT_IMAGE_URL}
          />
          {showViewGoal && (
            <div className="view-count">
              {egg.view_count}/{egg.view_goal}
            </div>
          )}
          <div className="share-link">
            <a href={egg.share_link} target="_blank" rel="noopener noreferrer">View Egg</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EggGrid;
