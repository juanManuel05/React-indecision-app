import React from 'react';

const Option = (props) => (
  <div className="option">
    <p className="option__text">{props.count}. {props.optionText}</p>
    <div className="option__right-size">
      <button 
        className="button button--link" 
        onClick={(e) => {props.handleEditOption(props.count -1); }}
      >
        Edit name
      </button>
      
      <button 
        className="button button--link" 
        onClick={(e) => {props.handleDeleteOption(props.optionText); }}
      >
        remove
      </button>
      </div>
  </div>
);

  export default Option; 