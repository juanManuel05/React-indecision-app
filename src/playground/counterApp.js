class Counter extends React.Component {

    constructor(props){
        super(props);
        this.AddOne = this.AddOne.bind(this);
        this.MinusOne = this.MinusOne.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            count:0
        };
    }

    AddOne(){
        this.setState((prevState)=>{
            return {
                count: prevState.count + 1
            }
        });
    }

    MinusOne(){
        this.setState((prevState)=>{
            return {
                count: prevState.count-1
            }
        });
    }

    reset(){
        this.setState(()=>{
            return {
                count:0
            }
        });
    }

    render(){
       return (
            <div>    
                <h1>{this.state.count}</h1>
                <button onClick={this.AddOne}>+l</button>
                <button onClick={this.MinusOne}>-1</button>
                <button onClick={this.reset}>Reset</button>
            </div>
       )
    }
}




ReactDOM.render(<Counter/>, document.getElementById('app'));
