import React, { useState, useEffect } from 'react';
import './DragonVillage.css';
import SubmitEggForm from './SubmitEggForm';
import DeleteEggForm from './DeleteEggForm';

function DragonVillage() {
  const DV_API_URL = 'http://localhost:3000/api/dragon_village_eggs';
  const DEFAULT_IMAGE_URL = '/images/default_redwyvern.png';

  const [eggs, setEggs] = useState([]);
  const [selectedEgg, setSelectedEgg] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [requiredClicks, setRequiredClicks] = useState(1);
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    fetch(DV_API_URL)
      .then(response => response.json())
      .then(data => {
        setEggs(data.map(egg => ({
          ...egg,
          image: egg.image || DEFAULT_IMAGE_URL,
          submission_time: egg.submission_time || new Date().toISOString()
        })));
        //Set # of clicks required before submitting a link
        // setRequiredClicks(data.length > 10 ? 10 : data.length);
        setRequiredClicks(0)
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
    if (clicks >= requiredClicks) {
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
            image: newEgg.image || DEFAULT_IMAGE_URL,
            submission_time: newEgg.submission_time || new Date().toISOString()
          }]);
          setClicks(0);
          setSelectedEgg(null);
          setErrorMessage('');
          // TO DO - set to 0 for testing, change later
          // setRequiredClicks(eggs.length + 1 > 10 ? 10 : eggs.length + 1);
          setRequiredClicks(0);
          setResetForm(true);
          setTimeout(() => setResetForm(false), 0);
        })
        .catch(error => {
          console.error('Error submitting eggs:', error);
          setErrorMessage(error.error || 'An unknown error occurred.');
        });
    } else {
      alert(`You need to click at least ${requiredClicks} links before adding your own!`);
    }
  };

  const handleDelete = (shareLink) => {
    fetch(`${DV_API_URL}/destroy_by_link`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ share_link: shareLink})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setEggs(eggs.filter(egg => egg.share_link !== shareLink));
        //TO DO - Set to 0 for testing, change to proper number later.
        // setRequiredClicks(eggs.length - 1 > 10 ? 10 : eggs.length - 1);
        setRequiredClicks(0);
      })
      .catch(error => {
        console.error('Error deleting egg:', error);
        setErrorMessage('Error deleting egg.');
      });
  };

  return (
    <div className="dragon-village">
      <SubmitEggForm onSubmit={handleSubmit} disabled={clicks < requiredClicks} reset={resetForm} />
      <DeleteEggForm onSubmit={handleDelete} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="egg-grid">
        {eggs.map((egg, index) => (
          <div key={egg.id || index} className="egg">
            <img
              src={egg.image}
              alt="Egg"
              onClick={() => handleEggClick(egg)}
              onError={(e) => e.target.src = DEFAULT_IMAGE_URL}
            />
            <div className="view-count">
              {egg.view_count}/{egg.view_goal}
            </div>
            <div className="share-link">
              <a href={egg.share_link} target="_blank" rel="noopener noreferrer">View Egg</a>
            </div>
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
