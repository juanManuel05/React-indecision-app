

class IndecisionApp extends React.Component {

    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePickOne = this.handlePickOne.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options:[]
        }        
    }

    //Lifecycle methods
    componentDidMount() {
        try {
            const jsonString = localStorage.getItem('options');
            const options = JSON.parse(jsonString);
    
            if(options){
                this.setState(()=> ({options}) )
            }   
        } catch (error) {
            //nothing at all
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleDeleteOptions(){
        this.setState(()=>  ({options:[]})  );
    }

    handleDeleteOption(optionRemoved){
        this.setState((prevState)=>{
            return {
                options: prevState.options.filter((option)=> optionRemoved !== option)
            } 
        });
    }

    handlePickOne(){
        let option = Math.floor(Math.random()* this.state.options.length);
        alert(this.state.options[option]);
    }

    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item';
        }else if(this.state.options.indexOf(option)>-1){
            return 'Value entered already exist';
        }

        this.setState((prevState)=>({options: prevState.options.concat(option)}));
        
    }


    //Main Componenet render
    render(){
        const subTitle = 'Put your life in the hand of a computer';

        return (
            <div>
                <Header subTitle={subTitle} />
                <Action hasOptions={this.state.options.length>0} handlePickOne={this.handlePickOne} />
                <Options 
                    options= {this.state.options} handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOptions handleAddOption={this.handleAddOption} />             
            </div>
        
        );
    }
}//IndecisionApp component

const Header = (props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
             {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    
    );    
}//HEADER component

const Action = (props)=>{
    return (
        <div>
            <button onClick={props.handlePickOne} disabled={!props.hasOptions}>What should i do?</button>                
        </div>   
    )
}//ACTION component


const Options = (props)=>{
    return (
        <div>    
            <button onClick={props.handleDeleteOptions}>Remove all</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {                    
                props.options.map((option)=> (
                    <Option 
                        key ={option} 
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                    />
                )) 
            }
        </div>
    );
}//OPTIONS component

const Option = (props)=>{
    return (
        <div>
            Option: {props.optionText}
            <button 
                onClick={(e)=>{
                    props.handleDeleteOption(props.optionText);
                }}>

                Remove option
            </button>
        </div>
    );
}//OPTION component

class AddOptions extends React.Component {

    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error:undefined
        }
    }

    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();

        //if the entered value is correct, handleAddOption will return nothing but updating
        //the 'state OPTIONS' meaning a new value for the array and thus will render it to the screen
        const error = this.props.handleAddOption(option);
        
        this.setState(()=> ({error}) );

        if(!error){
            e.target.elements.option.value ='';
        }
    }

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}   
                <form onSubmit={this.handleAddOption}>                    
                    <input type= "text" name = "option"/>
                    <button>Add option</button>                
                </form>
            </div>
        );
    }
}//AddOptions component



//Default props

Header.defaultProps = {
    title:'Indecision'
}




ReactDOM.render(<IndecisionApp />,document.getElementById('app'));