import React, { useState, useEffect } from 'react';
import EggGrid from '../EggGrid';
import EggViewer from '../EggViewer';

function DragonCave() {
  // const DC_API_URL = 'http://localhost:3000/api/dragon_cave_eggs';
  // const DEFAULT_IMAGE_URL = '/images/default_dragoncave.png';

  // const [eggs, setEggs] = useState([]);
  // const [selectedEgg, setSelectedEgg] = useState(null);
  // const [clicks, setClicks] = useState(0);
  // const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   fetchEggs();
  // }, []);

  // const fetchEggs = () => {
  //   fetch(DC_API_URL)
  //     .then(response => response.json())
  //     .then(data => {
  //       setEggs(data.map(egg => ({
  //         ...egg,
  //         image: egg.image || DEFAULT_IMAGE_URL,
  //         submission_time: egg.submission_time || new Date().toISOString()
  //       })));
  //       setRequiredClicks(0);
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // };

  // const handleEggClick = (egg) => {
  //   setSelectedEgg(egg);
  //   setClicks(clicks + 1);
  // };

  // const handleSubmit = (data) => {
  //   fetch(DC_API_URL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ dragon_cave_egg: data })
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         return response.json().then(err => { throw err; });
  //       }
  //       return response.json();
  //     })
  //     .then(newEgg => {
  //       const existingEggIndex = eggs.findIndex(egg => egg.share_link === newEgg.share_link);
  //       if (existingEggIndex !== -1) {
  //         const updatedEggs = [...eggs];
  //         updatedEggs[existingEggIndex] = {
  //           ...updatedEggs[existingEggIndex],
  //           ...newEgg,
  //           image: newEgg.image || DEFAULT_IMAGE_URL,
  //           submission_time: newEgg.submission_time || new Date().toISOString()
  //         };
  //         setEggs(updatedEggs);
  //       } else {
  //         setEggs([...eggs, {
  //           ...newEgg,
  //           image: newEgg.image || DEFAULT_IMAGE_URL,
  //           submission_time: newEgg.submission_time || new Date().toISOString()
  //         }]);
  //       }
  //       setClicks(0);
  //       setSelectedEgg(null);
  //       setErrorMessage('');
  //       setResetForm(true);
  //       setTimeout(() => setResetForm(false), 0);
  //     })
  //     .catch(error => {
  //       console.error('Error submitting eggs:', error);
  //       setErrorMessage(error.error || 'An unknown error occurred.');
  //     });
  //};

  // const handleDelete = (shareLink) => {
  //   fetch(`${DC_API_URL}/destroy_by_link`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ share_link: shareLink })
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       setEggs(eggs.filter(egg => egg.share_link !== shareLink));
  //       setRequiredClicks(0);
  //     })
  //     .catch(error => {
  //       console.error('Error deleting egg:', error);
  //       setErrorMessage('Error deleting egg.');
  //     });
  // };

  return (
    <div className="dragon-cave">
      {/* <SubmitDragonCaveEggForm onSubmit={handleSubmit} reset={resetForm} />
      <DeleteDragonCaveEggForm onSubmit={handleDelete} />
      {errorMessage && <div className="error-message">{errorMessage}</div>} */}
      <h1>Dragon Cave Hatchery</h1>
      <p>Coming soon!</p>
      {/* <EggGrid eggs={eggs} handleEggClick={handleEggClick} DEFAULT_IMAGE_URL={DEFAULT_IMAGE_URL} showViewGoal={false}/>
      <EggViewer selectedEgg={selectedEgg}/>*/}
    </div>
  );
}

export default DragonCave;