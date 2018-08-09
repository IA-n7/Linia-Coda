import React, { Component } from "react";
import "./Landing.css";
import SignUpForm from "./SignUpForm";
import { Paper, Typography, TextField, Button, Grid } from "@material-ui/core";
import mainLogo from './img/LiniaCodaLogo.png'

class Landing extends Component {
  render() {
    return (
      <div>
      <div className="landing-everything">
        <Grid container xs={12}>
          <Grid item xs>
            <div className="landing-title">
              <img src={mainLogo} className="img-logo"/>
              <h2 className="landing-title-slogan">
                A New Way To Queue
              </h2>
            </div>
          </Grid>
          <Grid item xs>
            <SignUpForm
              className="landing-form"
              loggedUser={this.props.loggedUser}
              isBusiness={this.props.isBusiness}
              businessFormToTrue={this.props.businessFormToTrue}
              />
          </Grid>
        </Grid>
      </div>

        {/* <div className="pimg1">
          <div className="ptext">
            <span className="border trans"> Linia Coda </span>
          </div>
        </div>

        <section className="section section-light">
          <h1>Queue up from anywhere!</h1>
          <h4>
            Linia Coda provides you the freedom of managing your own day <br/>
            while still being queued up for any service of your choosing.
          </h4>
        </section> */}

        <div className="pimg2">
          <div className="ptext">
            <span className="border">Queue up from anywhere</span>
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
            <span className="border">Business Owners Rejoice</span>
          </div>
        </div>

        <section className="section section-light">
          <h1 className="light-text">Your Queue. Your Way.</h1>
          <h4 className="light-text">
            Your business. Your data. Your rules.  <br/>
            By using Linia Coda, you will constantly have access to useful data about how your <br/>
             business is performing as well as having full control over the customization of your queue.
          </h4>
        </section>

        <div className="pimg4">
          <div className="ptext">
            <span className="border trans">Your Freedom</span>
          </div>
        </div>

      </div>
    );
  }
}

export default Landing;