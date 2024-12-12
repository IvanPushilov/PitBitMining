import React from 'react';
import '../styles/preLoader.css';

function PreLoader(): JSX.Element {
  return (
    <div id="spinner" className="container-spinner">
      <img src="/7YJW.gif" alt="" />
    </div>
  );
}

export default PreLoader;
