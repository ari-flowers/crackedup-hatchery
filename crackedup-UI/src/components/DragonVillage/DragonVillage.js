import React, { useState, useEffect } from 'react';
import './DragonVillage.css';
import SubmitEggForm from './SubmitEggForm';
import DeleteEggForm from './DeleteEggForm';

function DragonVillage() {
  const DV_API_URL = 'http://localhost:3000/api/dragon_village_eggs';

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
          image: egg.image || '/images/default_image.png', // Handle null image
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
            image: newEgg.image || '/images/default_image.png', // Handle null image
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

  const handleDelete = (shareLink) => {
    fetch(`${DV_API_URL}/${encodeURIComponent(shareLink)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setEggs(eggs.filter(egg => egg.share_link !== shareLink));
      })
      .catch(error => {
        console.error('Error deleting egg:', error);
        setErrorMessage('Error deleting egg.');
      });
  };

  return (
    <div className="dragon-village">
      <SubmitEggForm onSubmit={handleSubmit} disabled={clicks < REQUIRED_CLICKS} />
      <DeleteEggForm onSubmit={handleDelete} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="egg-grid">
        {eggs.map(egg => (
          <div key={egg.id} className="egg">
            <img src={egg.image} alt="Egg" onClick={() => handleEggClick(egg)} />
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
