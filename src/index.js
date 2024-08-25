import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Initialize the ReactDOM root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: If you want to start measuring performance in your app
import reportWebVitals from './reportWebVitals';
reportWebVitals(console.log); // Logs results to the console

// Alternatively, to measure performance, send results to an analytics endpoint
// reportWebVitals((metric) => {
//   // Example: send metric data to an analytics endpoint
//   console.log(metric);
// });
