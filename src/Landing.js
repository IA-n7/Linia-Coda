import React, { Component } from "react";
import "./Landing.css";
import SignUpForm from "./SignUpForm";
import { Paper, Typography, TextField, Button, Grid } from "@material-ui/core";

class Landing extends Component {


  render() {
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
                A New Way to Queue
              </Typography>
            </div>
          </Grid>
          <Grid item xs>
            <SignUpForm
              className="landing-form"
              loggedUser={this.props.loggedUser}
              />
          </Grid>
        </Grid>
      </div>

        <div className="pimg1">
          <div className="ptext">
            <span className="border trans"> Linia Coda </span>
          </div>
        </div>

        <section className="section section-light">
          <h1>Queue Up From Anywhere!</h1>
          <h4>
           Linia Coda provides you the freedom of managing your own day <br/>
           while still being queued up for any service of your choosing.
          </h4>
        </section>

        <div className="pimg2">
          <div className="ptext">
            <span className="border">Queue Up From Anywhere!</span>
          </div>
        </div>

        <section className="section section-dark">
          <h1>Your Day. Your Time.</h1>
          <h4>
           Linia Coda provides you the freedom of managing your own day <br/>
           while still being queued up for any service of your choosing.
          </h4>
        </section>

        <div className="pimg3">
          <div className="ptext">
            <span className="border">Business Owners Rejoice!</span>
          </div>
        </div>

        <section className="section section-light">
          <h1>Your Queue. Your Way.</h1>
          <h4>
            Your business. Your data. Your rules.  <br/>
            By using Linia Coda, you will constantly have access to useful data about how your <br/>
            business is performing as well as having full control over the customization of your queue.
          </h4>
        </section>

        <div className="pimg4">
          <div className="ptext">
            <span className="border trans">Your Freedom.&trade; </span>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;