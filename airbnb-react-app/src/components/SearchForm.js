import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from 'react-bootstrap';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      max: 0,
      order: '',
      sortByPrice: false,
      searchOption: 'name',
      searchName: 'Name',
      searchCountryName: 'All countries',
      searchCountry: 'all',
      countries: [
        { item: 'All countries', value: 'all' },
        { item: 'Australia', value: 'Australia' },
        { item: 'Brazil', value: 'Brazil' },
        { item: 'Canada', value: 'Canada' },
        { item: 'China', value: 'China' },
        { item: 'Hong Kong', value: 'Hong Kong' },
        { item: 'Portugal', value: 'Portugal' },
        { item: 'Spain', value: 'Spain' },
        { item: 'Turkey', value: 'Turkey' },
        { item: 'United States', value: 'United States' },
      ],
      options: [
        {
          item: 'Name',
          value: 'name',
        },
        { item: 'Description', value: 'description' },
        { item: 'Min nights', value: 'minimum_nights' },
        { item: 'Max nights', value: 'maximum_nights' },
        { item: 'Accommodates', value: 'accommodates' },
        { item: 'Bedrooms', value: 'bedrooms' },
        { item: 'Beds', value: 'beds' },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClick = () => {
    this.props.setStates(this.state);
  };

  changeSearchCountry(country) {
    this.setState({
      searchCountry: country.value,
      searchCountryName: country.item,
    });
  }

  changeSearchValue(name, value) {
    this.setState({
      searchName: name,
      searchOption: value,
    });
  }

  sortByReview() {
    this.setState({
      sortByPrice: false,
    });
  }

  sortByPrice() {
    this.setState({
      sortByPrice: true,
    });
  }

  componentDidMount() {
    this.props.setStates(this.state);
  }

  render() {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Row className="mt-5">
          <Col lg={2} className="mt-2">
            <Form.Label>Select country:</Form.Label>
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={this.state.searchCountryName}
              >
                {this.state.countries.map((country, i) => (
                  <Dropdown.Item
                    key={i}
                    value={country.value}
                    onClick={() => this.changeSearchCountry(country)}
                  >
                    {country.item}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
          </Col>
          <Col className="mt-2">
            <Form.Label>Search for:</Form.Label>
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={this.state.searchName}
              >
                {this.state.options.map((option, i) => (
                  <Dropdown.Item
                    key={i}
                    value={option.item}
                    onClick={() =>
                      this.changeSearchValue(option.item, option.value)
                    }
                  >
                    {option.item}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <FormControl
                name="searchWord"
                onChange={this.handleChange}
                value={this.state.searchWord}
                placeholder="(Optional)"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleClick}>
                  Go!
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Col className="mt-4">
          <Row>
            <Col>
              {this.state.max >= 1 && (
                <Form.Label>Max price {this.state.max} €</Form.Label>
              )}
              {this.state.max < 1 && <Form.Label>Max price</Form.Label>}
              <Form.Control
                type="range"
                max="1000"
                name="max"
                onChange={this.handleChange}
                value={this.state.max}
              ></Form.Control>
            </Col>
          </Row>
          <Col className="d-flex justify-content-center">
            <Row className="mt-2">
              <Form.Label className="mt-2">Sort by</Form.Label>
              <Col style={{ display: 'flex', marginTop: '0.5rem' }}>
                <Form.Check
                  defaultChecked
                  type="radio"
                  label="Reviews"
                  name="sort"
                  onChange={this.sortByReview.bind(this)}
                />

                <Form.Check
                  className="ml-3"
                  type="radio"
                  label="Price"
                  name="sort"
                  onChange={this.sortByPrice.bind(this)}
                />
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="order"
                  onChange={this.handleChange}
                  value={this.state.order}
                >
                  <option value="">Descending</option>
                  <option value="asc">Ascending</option>
                </Form.Control>
              </Col>
            </Row>
          </Col>
        </Col>
      </Form>
    );
  }
}

export default SearchForm;
