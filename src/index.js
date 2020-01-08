import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const ticketsService = new TicketsService();

ReactDOM.render(<App />,
  document.getElementById('root'),
);
