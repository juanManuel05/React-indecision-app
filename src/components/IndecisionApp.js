import React from 'react';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';
import EditNameModal from './EditNameModal';



class IndecisionApp extends React.Component {

    state = {
      options:[],
      selectedOption:undefined,
      editOption:undefined,
      index:undefined
    };

    handleDeleteOptions = ()=> {
      this.setState(() => ({ options: [] }));
    }

    handleDeleteOption = (optionToRemove)=> {
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => optionToRemove !== option)
      })); 
    }
    
    handlePick = ()=> {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];

      this.setState(()=>({
        selectedOption:option
      }));
    }

    handleEditOption = (index)=> {
      this.setState(()=>({
        editOption:true,
        index
      })

      );
    }

    HandleClearEditOption = ()=> {
      this.setState(()=>({
        editOption:undefined
      }));  
    }

    HandleCloseEditOption = (newValue)=> {

      if (!newValue) {
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(newValue) > -1) {
        return 'This option already exists';
      }
      this.state.options[this.state.index] = newValue;
      let newOptions = this.state.options;
      this.setState(()=>({        
        options: newOptions,
        editOption:undefined,
      }));  
    }

    HandleClearSelectedOption = () => {
      this.setState(()=>({
        selectedOption:undefined
      }));
    }

    handleAddOption = (option)=> {
      if (!option) {
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }
  
      this.setState((prevState) => ({
        options: prevState.options.concat(option)
      }));
    }

    
    componentDidMount() {
      try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
  
        if (options) {
          this.setState(() => ({ options }));
        }
      } catch (e) {
        // Do nothing at all
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
    componentWillUnmount() {
      console.log('componentWillUnmount');
    }    

    render() {
      const subtitle = 'Put your life in the hands of a computer';
  
      return (
        <div>
          <Header subtitle={subtitle} />
          <div className="container">
            <Action
              hasOptions={this.state.options.length > 0}
              handlePick={this.handlePick}
            />
            <div className="widget">
              <Options
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
                handleChangeName={this.handleChangeName}
                handleEditOption={this.handleEditOption}
              />
              <AddOption
                handleAddOption={this.handleAddOption}
                maxOptions={this.state.options.length<3}
              />
            </div>
          </div>

          <OptionModal 
            selectedOption={this.state.selectedOption} 
            HandleClearSelectedOption={this.HandleClearSelectedOption}          
          />

          <EditNameModal 
            editOption={this.state.editOption}
            HandleCloseEditOption={this.HandleCloseEditOption}
            HandleClearEditOption={this.HandleClearEditOption}
          />
        </div>        
      );
    }
  } 

  export default IndecisionApp;