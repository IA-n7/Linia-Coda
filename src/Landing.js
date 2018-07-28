import React, { Component } from 'react';
import './Landing.css';
import {
  Paper,
  Typography,
  TextField,
  Button 
} from '@material-ui/core'


class Landing extends Component {

  constructor() {
    super();

    this.state = {
    }
  }

  render(){
    return (
      <Paper className="paper-form">
        <h2>Sign Up</h2>
        <form autoComplete="off">
          <TextField
            name='name'
            label="Full Name"
            onChange={this.handleChange}
            margin='normal'
          />
          <br/>
          <TextField
            name='email'
            label="Email"
            onChange={this.handleChange}
            margin='normal'
          />
          <br/>
          <TextField
            name='Password'
            label="Password"
            type="password"
            onChange={this.handleChange}
            margin='normal'
          />
          <br/>
          <Button
            type='submit'
            color='primary'
            variant='raised'
          >
          Create
        </Button>
      </form>
    </Paper>
    )
  }
  
}

export default Landing