import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import Aparment from './Apartments';
import ReactStars from 'react-stars';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.searchResults.docs) {
      return (
        <div>
          <Accordion>
            {this.props.searchResults.docs.map((item) => (
              <Card key={item._id}>
                <Card.Header>
                  <Row>
                    <Col md>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={item._id}
                      >
                        {item.name}
                      </Accordion.Toggle>
                    </Col>
                    <Col className="d-flex justify-content-end mx-5">
                      {item.price ? (
                        <div className="mt-2">{item.price.$numberDecimal}€</div>
                      ) : null}
                      {item.review_scores ? (
                        <div style={{ minWidth: '5rem' }} className="ml-5">
                          <ReactStars
                            value={item.review_scores.review_scores_rating / 20}
                            count={5}
                            size={24}
                            edit={false}
                            color2={'#ffd700'}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                </Card.Header>
                <Accordion.Collapse eventKey={item._id}>
                  <Card.Body>
                    <Aparment id={item._id} showImg={true} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading..</h3>
        </div>
      );
    }
  }
}

export default Results;
