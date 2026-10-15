import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return <main><p>QuikDB official template</p><h1>Your React application is live.</h1>
    <span>Edit the source and deploy your next release on QuikDB.</span></main>;
}
createRoot(document.getElementById('root')).render(<App />);
