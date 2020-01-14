import React from 'react';



export default class AddOption extends React.Component {
   /**IMPORTANT! class-Properties-sintax pluggin was used to re-build the declaration */
  
   state = {
    error:undefined
  };

  handleAddOption = (e)=> {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';      
    }
    e.target.elements.option.focus();
  }  

  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOption}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button" disabled={!this.props.maxOptions}>Add Option</button>
        </form>
      </div>
    );
  }
}

// constructor(props) {
//   super(props);
//   this.handleAddOption = this.handleAddOption.bind(this);
// }
  
// handleAddOption(e) {
//   e.preventDefault();

//   const option = e.target.elements.option.value.trim();
//   const error = this.props.handleAddOption(option);

//   this.setState(() => ({ error }));

//   if (!error) {
//     e.target.elements.option.value = '';
//   }
// }

