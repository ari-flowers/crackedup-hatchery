import React, { useState, useEffect } from 'react';
import './DragonVillage.css';
import SubmitEggForm from './SubmitEggForm';

function DragonVillage() {
  const DV_API_URL = 'http://localhost:3000/api/dragon_village_eggs';
  const DEFAULT_IMAGE_URL = '/images/default_redwyvern.png'

  const [eggs, setEggs] = useState([]);
  const [selectedEgg, setSelectedEgg] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const REQUIRED_CLICKS = 1;

  useEffect(() => {
    fetch(DV_API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched eggs:', data);
        setEggs(data.map(egg => ({
          ...egg,
          image: egg.image || DEFAULT_IMAGE_URL, // Handle null image
          submission_time: egg.submission_time || new Date().toISOString() // Handle null submission_time
        })));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleEggClick = (egg) => {
    setSelectedEgg(egg);
    setClicks(clicks + 1);
  };

  const handleSubmit = (data) => {
    if (clicks >= REQUIRED_CLICKS) {
      fetch(DV_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dragon_village_egg: data })
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(err => { throw err; });
          }
          return response.json();
        })
        .then(newEgg => {
          setEggs([...eggs, {
            ...newEgg,
            image: newEgg.image || DEFAULT_IMAGE_URL, // Handle null image
            submission_time: newEgg.submission_time || new Date().toISOString() // Handle null submission_time
          }]);
          setClicks(0);
          setSelectedEgg(null);
          setErrorMessage('');
        })
        .catch(error => {
          console.error('Error submitting eggs:', error);
          setErrorMessage(error.error || 'An unknown error occurred.');
        });
    } else {
      alert(`You need to click at least ${REQUIRED_CLICKS} eggs before adding your own!`);
    }
  };

  return (
    <div className="dragon-village">
      <SubmitEggForm onSubmit={handleSubmit} disabled={clicks < REQUIRED_CLICKS} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
