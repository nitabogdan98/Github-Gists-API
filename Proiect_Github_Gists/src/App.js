import React, { Component } from "react";
import axios from "axios";
import Gist from "./Gist";
import { Container, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const api = axios.create();
let id = 1;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gists: [],
      username: '',
      message: 'Choose username:',
      forks: []
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.username;
    api.get(`https://api.github.com/users/${data}/gists?page=${id}&per_page=5`)
      .then(res => {
        this.setState({ gists: res.data })
        console.log(id)
        //Verify if the response is empty
        if (!Object.keys(res.data).length) {
          id = 1;
        }
      })
      .catch(error => {
        id = 1;
        this.setState({ message: `User ${data} not found, try another username` });
      });
    id++;
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    const { username } = this.state.username;
    if (this.state.gists.length > 0) {
      return (
        <Container>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Gists</th>
                <th scope="col">Users who forked</th>
              </tr>
            </thead>
            <tbody>
              {this.state.gists.map(gist => (
              <Gist gist={gist} />
            ))}
            </tbody>
          </table>
          <Button onClick={this.handleSubmit}>Next</Button>
        </Container>
      )
    } else {
      return (
        <Container>
          <p>{this.state.message}</p>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="username" value={username} name="username" onChange={this.handleInputChange} />
            </Form.Group>
            <Button onClick={this.handleSubmit}>Search for Gists</Button>
          </Form>
        </Container>
      );
    }
  }
}

export default App;

