import React from 'react';
import "./mainButton.css";
function MainButton({text , onClick}) {
  return (
    <div>
       <button className='main-button'>{text}</button>
    </div>
  )
}

export default MainButton;