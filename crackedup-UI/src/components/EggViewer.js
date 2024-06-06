import React from 'react';

function EggViewer({ selectedEgg }) {
  return (
    <div className="egg-viewer">
      {selectedEgg && <iframe src={selectedEgg.share_link} title="Egg Viewer" />}
    </div>
  );
}

export default EggViewer;
