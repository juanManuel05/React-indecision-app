import React from 'react';
import Option from './Option';

const Options = (props) => 
  (
    <div>
      <div className="widget_header">
        <h3 className="widget_header__Options">Your Options</h3>        
        <button 
          onClick={props.handleDeleteOptions}
          className="button button--link"
        >        
          Remove All
        </button>
      </div>
      {props.options.length === 0 && <p className="widget__message">Please add an option to get started!</p>}      
      
      {
        props.options.map((option,index) => (
          <Option
            key={option}
            optionText={option}
            count={index+1}
            handleDeleteOption={props.handleDeleteOption}
            handleEditOption={props.handleEditOption}
          />
        ))
      }

      {props.options.length === 3 && <p className="widget__message">you have reached the max allowed!</p>}  
    </div>
  );

export default Options;