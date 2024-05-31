import React, { useState, useEffect } from 'react';
import './DragonVillage.css'; // Import the stylesheet

function DragonVillage() {
  const [eggs, setEggs] = useState([]);
  const [selectedEgg, setSelectedEgg] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/dragon_village_eggs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched eggs:', data); // Log the fetched data
        setEggs(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleEggClick = (egg) => {
    setSelectedEgg(egg);
  };

  return (
    <div className="dragon-village">
      <div className="egg-grid">
        {eggs.map(egg => (
          <div key={egg.id} className="egg" onClick={() => handleEggClick(egg)}>
            <img src={egg.image} alt="Egg" />
          </div>
        ))}
      </div>
      <div className="egg-viewer">
        {selectedEgg && <iframe src={selectedEgg.share_link} title="Egg Viewer" />}
      </div>
    </div>
  );
}

export default DragonVillage;
