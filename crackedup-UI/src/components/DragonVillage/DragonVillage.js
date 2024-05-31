import React, { useState, useEffect } from 'react';
import './DragonVillage.css'; // Import the stylesheet
import SubmitEggForm from './SubmitEggForm';

function DragonVillage() {
  const DV_API_URL = 'http://localhost:3000/api/dragon_village_eggs'
  const [eggs, setEggs] = useState([]);
  const [selectedEgg, setSelectedEgg] = useState(null);
  const [clicks, setClicks] = useState(0);
  const REQUIRED_CLICKS = 10;

  useEffect(() => {
    fetch(DV_API_URL)
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
    setClicks(clicks +1);
  };

  const handleSubmit = (data) => {
    if (clicks >= REQUIRED_CLICKS) {
      fetch(DV_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(newEgg => {
        setEggs([...eggs, newEgg])
        setClicks(0)
      })
      .catch(error => {
        console.error('Error submitting eggs', error)
      })
    } else {
      alert(`You need to click at least ${REQUIRED_CLICKS} eggs before adding your own!`)
    }
  }


  return (
    <div className="dragon-village">
      <SubmitEggForm onSubmit={handleSubmit} />
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
