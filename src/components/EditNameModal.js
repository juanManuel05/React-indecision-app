import React from 'react';
import Modal from 'react-modal';



export default class EditNameModal extends React.Component {

    state = {
        error:undefined
    };

    HandleCloseEditOption = ()=> {
        const newValue = document.getElementById('option').value;
        const error = this.props.HandleCloseEditOption(newValue);
    
        this.setState(() => ({ error }));
    
        if (!error) {
            {this.props.HandleClearEditOption}
        }
    } 

    render() {
        return (
            <Modal 
                isOpen ={ this.props.editOption}//converts a valid strings over to true and undefined over to false
                onRequestClose = {this.props.HandleClearEditOption}
                contentLabel = "Type new Option" 
                closeTimeoutMS={200} 
                className="modal"  
             >   
                <h3 className="modal__title">Type new Option name</h3>
                <div>
                    {this.state.error && <p className="modal-error">{this.state.error}</p>}                
                    <input className="add-option__input" type="text" name="option" id="option"/>
                    <button className="button" onClick={this.HandleCloseEditOption}>Submit</button>
                
                </div>               
            </Modal> 
        );
    }    
}