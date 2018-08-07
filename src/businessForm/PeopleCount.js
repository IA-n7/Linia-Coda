import React, { Component } from 'react';
import PropTypes from 'prop-types';
import db from '../config/firebase.js';
import {Line} from 'react-chartjs-2';

class PeopleCount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: 0,
      size: 0
    }
  }

  getPeople = () => {
    db.collection('Users').get().then(res => {
      let size = res.size;
      this.setState({
       size
     });
    });
  }

  componentDidMount() {
    this.getPeople();
  }

  render() {
        const data = {
      labels: this.state.people,
      datasets: [
        {
          label: "Number of Guest Per Hour",
          fill: true,
          // lineTension: 0.1,
          // backgroundColor: 'rgba(75,192,192,0.4)',
          // borderColor: 'rgba(75,192,192,1)',
          // borderCapStyle: 'butt',
          // borderDash: [],
          // borderDashOffset: 0.0,
          // borderJoinStyle: 'miter',
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          // pointBorderWidth: 1,
          // pointHoverRadius: 5,
          // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          // pointHoverBorderColor: 'rgba(220,220,220,1)',
          // pointHoverBorderWidth: 2,
          // pointRadius: 1,
          // pointHitRadius: 10,
          data: [1, 2, 3]
        }
      ]
    }

    return (
      <div>
 {/*     <Doughnut data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }} />*/}

      <Line
       data={data}

       options={{
        maintainAspectRatio: false
      }}
    />

          People in queue: {this.state.size}

      </div>
    );
  }
}

export default PeopleCount;