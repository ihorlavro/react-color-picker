import React from 'react';

import ColorPicker from '../ColorPicker';

import './App.scss';

const App = () => {
  const colors = [
    {
      label: 'Red',
      hexCode: '#e21e26',
    },
    {
      label: 'Yellow',
      hexCode: '#e9b631',
    },
    {
      label: 'Green',
      hexCode: '#03a455',
    },
    {
      label: 'Blue',
      hexCode: '#00aeed',
    },
  ];

  return (
    <div className="app-container">
      <ColorPicker value="#e9b631" onChange={() => {}} colors={colors} />
    </div>
  );
};

export default App;
