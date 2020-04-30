import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Image,
  Spinner,
  Row,
  Col,
  Accordion,
  Card,
  Button,
} from 'react-bootstrap';

class Apartments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apartmentPicture: '',
      description: '',
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
    console.log(url);
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        response.json().then((data) => {
          console.log(data.docs[0]);
          response = data.docs[0];
          if (response.images) {
            this.setState({
              apartmentPicture: response.images.picture_url,
              description: response.description,
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

  render() {
    var img;
    if (this.props.showImg) {
      img = (
        <div className="img-wrap">
          {this.state.didLoad === false && (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          )}
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
      <Container>
        <Row>
          <Row style={{ minWidth: '70%', minHeight: '25rem' }}>
            <Col md={10}>
              <div>
                <h4>Something here</h4>
              </div>
              {img}
            </Col>
          </Row>
          <Col>
            <div>
              <h4>Something here</h4>
              <p>{this.state.description}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion>
              <Card key="1">
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Hello
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body></Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Apartments;
