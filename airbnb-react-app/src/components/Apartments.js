import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';

class Apartments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      apartmentPicture: '',
      didLoad: false,
    };
  }

  componentDidMount() {
    this.doFetch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.removePicture();
      this.doFetch();
    }
  }

  doFetch() {
    var url = 'https://airbnb-restapi.herokuapp.com/api/id/' + this.props.id;
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        response.json().then((data) => {
          response = data.docs[0];
          if (response.images) {
            this.setState({
              apartmentPicture: response.images.picture_url,
              data: response,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removePicture() {
    this.setState({
      apartmentPicture: '',
      didLoad: false,
    });
  }
  onLoad = () => {
    this.setState({
      didLoad: true,
    });
  };

  showDetails(url) {
    window.open(url);
  }

  render() {
    var str = '';
    if (this.state.data.amenities) {
      this.state.data.amenities.forEach((item) => {
        str += item + ', ';
      });
      str = str.replace(/,\s*$/, '.');
    }
    var amenities = <div>{str}</div>;

    var img;
    if (this.props.showImg) {
      img = (
        <div className="img-wrap">
          <Image
            src={this.state.apartmentPicture}
            onLoad={this.onLoad}
            alt=""
            fluid
            rounded
          />
        </div>
      );
    } else {
      img = null;
    }

    return (
      <Container fluid>
        <Row>
          <Col className="mt-3" lg={6}>
            {img}
          </Col>
          <Col className="mt-3">
            <Row>
              <Col>
                <h5>{this.state.data.room_type}</h5>
              </Col>
              <Col>
                {this.state.data.address && (
                  <h5>{this.state.data.address.government_area}</h5>
                )}
              </Col>
            </Row>
            {str ? amenities : <p>No amenities listed.</p>}
          </Col>
        </Row>
        <br />
        <h5>Description</h5>
        <p>{this.state.data.description}</p>
        <div className="d-flex justify-content-center">
          <Button
            onClick={() => this.showDetails(this.state.data.listing_url)}
            variant="outline-secondary"
            className="d-flex justify-content-center"
          >
            Reserve
          </Button>
        </div>
      </Container>
    );
  }
}

export default Apartments;
