import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Pagination, Row, Col } from 'react-bootstrap';

class Paginate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setPage(page) {
    this.props.paginate(page);
  }

  render() {
    return (
      <div>
        {this.props.searchResults.totalPages > 1 && (
          <Container className="m-5">
            <Row>
              <Col></Col>
              <Col>
                <Pagination>
                  <Pagination.First onClick={() => this.setPage(1)} />
                  {this.props.searchResults.prevPage && (
                    <Pagination.Item
                      onClick={() =>
                        this.setPage(this.props.searchResults.prevPage)
                      }
                    >
                      {this.props.searchResults.prevPage}
                    </Pagination.Item>
                  )}
                  <Pagination.Item active>
                    {this.props.searchResults.page}
                  </Pagination.Item>
                  {this.props.searchResults.nextPage && (
                    <Pagination.Item
                      onClick={() =>
                        this.setPage(this.props.searchResults.nextPage)
                      }
                    >
                      {this.props.searchResults.nextPage}
                    </Pagination.Item>
                  )}
                  <Pagination.Ellipsis />
                  <Pagination.Item>
                    {this.props.searchResults.totalPages}
                  </Pagination.Item>
                </Pagination>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default Paginate;
