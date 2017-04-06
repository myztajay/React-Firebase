import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { database } from './firebase'

//life cycle events baked in
// constructor of this component can take in props
class App extends Component {
  constructor(props) {
    // gets this passed in but props belong to super class
    super(props);
    // unque about this component
    this.state = {
      data: null,
      newData: ''
    };
    this.dataRef = null;

    // lock in context
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // built in to react compoenent to confirm when a compoennt was loaded what to do
  componentDidMount() {
    this.dataRef = database.ref('/users')
    // .ref refers to node empty = top node, .on like jquery value change.
    // snapshot is the value of data at the given moment, vs any other time(Real time)

    // .on can be subbed for .once < give you back a promise .once('child_added').then...
    this.dataRef.on('value', (snapshot)=>{
      this.setState({
        // snapshot is the value of data at the given moment, vs any other time(Real time)
        data: snapshot.val()
      })
      console.log('data changed', snapshot.val());
    });
  }
  handleChange(event){
    const newData = event.target.value;
    this.setState({
      // shorthand for newData: newData
      newData
    })
  }

  handleSubmit(event) {
    event.preventDefault();
      this.dataRef.push(this.state.newData);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <pre className="App-intro">
          Here is where the firebase code will go
          { JSON.stringify(this.state.data, null, 5) }
        </pre>

        <form className="App-form" onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.newData} onChange={this.handleChange} />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default App;
