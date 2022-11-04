import React from 'react';
import './index.css';

import AddressInput from './components/AddressInput.jsx';

export default function App() {
  return (
    <div>
      <div id="page" className=" font-main  md:px-7 px-3 md:py-8 py-3">
      <div
        id="pageWrapper"
        className=" max-w-4xl mx-auto px-4 py-6 min-w-[350px]  "
      >

    <AddressInput />
    
      </div>
      </div> 
    </div>
  );
}
