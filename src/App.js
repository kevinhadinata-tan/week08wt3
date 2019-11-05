import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      error: {},
      result: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.handleNewResponse = this.handleNewResponse.bind(this);
  }

  handleNewResponse() {
    this.setState({
      input: {},
      result: {},
      error: {}
    });
  }

  handleInputChange(evt) {
    const input = this.state.input; // copy state
    input[evt.target.name] = evt.target.value; // target => objek tempat input data
    input[evt.target.email] = evt.target.value;
    this.setState({ input }); // this.setState({field: input}) bisa disederhanakan
  }

  validate(dataInput) {
    var error = {};
    if (!dataInput.name) {
      error.name = "Name is required";
    }
    if (!dataInput.email) {
      error.email = "Email is required";
    }
    if (dataInput.email && !/([a-zA-Z0-9_\.]+)@([a-zA-Z0-9_\.\-]+).([a-zA-Z0-9]+)/.test(dataInput.email)) {
      error.email = "Please input valid email";
    }

    return error;
  }

  onFormSubmit() {
    const error = this.validate(this.state.input);
    this.setState({ error });

    // ada error, jangan proses data
    if (Object.keys(error).length > 0) return ;

    this.setState({
      result: this.state.input,
      input: {}
    });
  }

  render() {
    if (Object.keys(this.state.result).length == 0) {
      return (
        <div className="form">
          <h1>Internet Usage Survey</h1>
          <div className="section">
            <h2>Profile</h2>
            <div className="form-item">
              <div className="label">Name: *</div>
              <div className="input">
                <input type="text" name="name"
                      value={this.state.input.name}
                      onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="error">
              {this.state.error.name}
            </div>

            <div className="form-item">
              <div className="label">Email: *</div>
              <div className="input">
                <input type="text" name="email"
                      value={this.state.input.email}
                      onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="error">
              {this.state.error.email}
            </div>

            <button name="btnsubmit"
                    value="Submit"
                    onClick={this.onFormSubmit}>Submit</button>
          </div>
        </div>
      );
    } else { // result ada isinya, tampilkan hasil
      return (
        <div className="form-result">
          <h1>Survey Result</h1>
          <hr />
          <div className="section">
            <h2>Profile</h2>
            <div>Name: {this.state.result.name} </div>
            <div>Name: {this.state.result.email} </div>
          </div>
          <button onClick={this.handleNewResponse}>Send Another Response</button>
        </div>
      );
    }
  }
}

export default App;
