import React, { Component } from "react";
import "./Landing.css";
import SignUpForm from "./SignUpForm";
import BusinessSignUp from "./BusinessSignup.js";
import { Paper, Typography, TextField, Button, Grid } from "@material-ui/core";

class Landing extends Component {

  constructor(props){
    super(props)

    this.state = {
      isBusiness: false
    }
  }

  businessFormToTrue = (event, checked) => {
    this.setState({ isBusiness: checked })
  }

  componentDidMount() {
    this.props.authListener();
  }

  render() {

    let businessForm;
    let userForm;

    if ( this.state.isBusiness === true ) {
      businessForm = ( <BusinessSignUp /> )
    } else {

      userForm = (
            <SignUpForm
              className="landing-form"
              loggedUser={this.props.loggedUser}
              businessFormToTrue={this.businessFormToTrue}
              authListener={this.props.authListener}
              />
            )
      }

    return (
      <div>
      <div className="landing-everything">
        <Grid container xs={12}>
          <Grid item xs>
            <div className="landing-title">
              <Typography
                className="landing-title-name"
                align="left"
                variant="display4"
                >
                Linia Coda
              </Typography>
              <Typography
                className="landing-title-slogan"
                align="left"
                variant="display1"
                >
                The Queue Boi
              </Typography>
            </div>
          </Grid>
          <Grid item xs>
            {businessForm}
            {userForm}
          </Grid>
        </Grid>
      </div>

        <div className="pimg1">
          <div className="ptext">
            <span className="border trans"> Linia Coda </span>
          </div>
        </div>

        <section className="section section-light">
          <h2>Section One</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            ipsa nulla modi quaerat sed esse quisquam praesentium voluptate
            delectus, doloribus fugit cum vel quas in similique cumque ipsum
            dolorem obcaecati tenetur dolorum voluptates itaque. Deserunt
            voluptate consectetur hic suscipit natus omnis quis amet dolores
            esse, reiciendis explicabo similique voluptas eos, debitis
            repudiandae dolorem distinctio magni tempore adipisci facilis. Ipsa
            nobis eveniet esse sit sunt voluptatum quas laudantium qui aliquam,
            optio, ipsum nostrum vel. Quidem totam est ab, ad earum neque quos
            tempore nesciunt omnis mollitia ullam consequuntur ipsa officia
            architecto unde porro assumenda nobis placeat optio ex vero. Labore,
            ducimus.
          </p>
        </section>

        <div className="pimg2">
          <div className="ptext">
            <span className="border">Best Thing2</span>
          </div>
        </div>

        <section className="section section-dark">
          <h2>Section Two</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            ipsa nulla modi quaerat sed esse quisquam praesentium voluptate
            delectus, doloribus fugit cum vel quas in similique cumque ipsum
            dolorem obcaecati tenetur dolorum voluptates itaque. Deserunt
            voluptate consectetur hic suscipit natus omnis quis amet dolores
            esse, reiciendis explicabo similique voluptas eos, debitis
            repudiandae dolorem distinctio magni tempore adipisci facilis. Ipsa
            nobis eveniet esse sit sunt voluptatum quas laudantium qui aliquam,
            optio, ipsum nostrum vel. Quidem totam est ab, ad earum neque quos
            tempore nesciunt omnis mollitia ullam consequuntur ipsa officia
            architecto unde porro assumenda nobis placeat optio ex vero. Labore,
            ducimus.
          </p>
        </section>

        <div className="pimg3">
          <div className="ptext">
            <span className="border">Best Thing3</span>
          </div>
        </div>

        <section className="section section-light">
          <h2>Section Three</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            ipsa nulla modi quaerat sed esse quisquam praesentium voluptate
            delectus, doloribus fugit cum vel quas in similique cumque ipsum
            dolorem obcaecati tenetur dolorum voluptates itaque. Deserunt
            voluptate consectetur hic suscipit natus omnis quis amet dolores
            esse, reiciendis explicabo similique voluptas eos, debitis
            repudiandae dolorem distinctio magni tempore adipisci facilis. Ipsa
            nobis eveniet esse sit sunt voluptatum quas laudantium qui aliquam,
            optio, ipsum nostrum vel. Quidem totam est ab, ad earum neque quos
            tempore nesciunt omnis mollitia ullam consequuntur ipsa officia
            architecto unde porro assumenda nobis placeat optio ex vero. Labore,
            ducimus.
          </p>
        </section>

        <div className="pimg4">
          <div className="ptext">
            <span className="border trans"> Catinian&trade; </span>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;
