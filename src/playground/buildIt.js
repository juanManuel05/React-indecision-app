class VisibilityToogle extends React.Component {
    //constructor
    constructor(props){
        super(props);
        this.toogleVisibility = this.toogleVisibility.bind(this);
        this.state = {
            visibility:false
        }
    }

    toogleVisibility (){
        this.setState((prevState)=>{
            return{
                visibility: !prevState.visibility
            }
        });
    }
    
    render(){
        return (
            <div> 
                <h1>visibility Toggle</h1>
                <button onClick={this.toogleVisibility}> { this.state.visibility ? 'hide details':'show details'}</button>
                {this.state.visibility && (
                    <div>
                        <p>'Here is some details'</p>
                    </div>
                )}               
            </div>
        )
    }
};

ReactDOM.render(<VisibilityToogle/>, document.getElementById('app'));
