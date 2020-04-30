import React from 'react';
import bgimage from '../airbnb-large.png';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="text-center" bg="light">
        <Card.Img variant="top" src={bgimage} />
        <Card.Body variant="primary">
          <Card.Title>Belong Anywhere.</Card.Title>
          <Card.Text>
            Airbnb is one of the world’s largest marketplaces for unique,
            authentic places to stay and things to do, offering over 7 million
            accommodations and 50,000 handcrafted activities, all powered by
            local hosts.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Home;
