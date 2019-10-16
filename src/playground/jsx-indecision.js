console.log('App.js is running!');

// JSX - JavaScript XML

const app = ({
    title: 'Some title',
    subtitle: 'Some subtitle',
    options: []
});

const onFormSubmit = (e)=>{
    e.preventDefault();
    const option = e.target.elements.option.value;

    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
    }

    renderCounterApp();
};

const removeOptions = ()=>{
    if(app.options.length>=0){
        app.options = [];
        renderCounterApp();    
    }
    renderCounterApp();
    console.log('empty');
}

const onMakeDecision = ()=>{
    const randomNum =Math.floor((Math.random() * app.options.length));
    const option = app.options[randomNum];
    alert(option);
}



const appRoot = document.getElementById('app');

const renderCounterApp = ()=>{
    
    const template =(
        <div> 
            <h1>{app.title}</h1>
            { app.subtitle && <p>Subtitle: app.subtitle</p> }
            <p>{ app.options.length > 0 ? 'Here are your options' : 'not options available' }</p>
            <button onClick={onMakeDecision} disabled={app.options.length===0}>What should i do?</button>
            <button onClick={removeOptions}>Remove all</button>
            <ol>               
                { 
                    app.options.map((option)=> <li key={option}> Option: {option}</li>)
                }
                
            </ol>
            
            
           
            
            <form onSubmit={onFormSubmit}>
                <input type= "text" name = "option"/>
                <button>Add option</button>
                
            </form>
        </div>
    );
    ReactDOM.render(template,appRoot);
}

renderCounterApp();






