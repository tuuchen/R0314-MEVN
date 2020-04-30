import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgimage from '../2.png';
import { Container, Card } from 'react-bootstrap';
import Results from './Results';
import Paginate from './Paginate';
import SearchFrom from './SearchForm';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchWord: '',
      max: '',
      order: '',
      sortByPrice: '',
      searchOption: '',
      searchCountry: '',
    };

    this.setStates = this.setStates.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  setStates(state) {
    this.setState(
      {
        searchWord: state.searchWord,
        max: state.max,
        order: state.order,
        sortByPrice: state.sortByPrice,
        searchOption: state.searchOption,
        searchCountry: state.searchCountry,
      },
      () => {
        this.getResults();
      }
    );
  }

  getResults(page) {
    if (!page) {
      page = 1;
    }
    var url;
    if (this.state.searchWord === '') {
      url =
        'https://airbnb-restapi.herokuapp.com/api/country/' +
        this.state.searchCountry +
        '?page=' +
        page;
    } else {
      url =
        'https://airbnb-restapi.herokuapp.com/api/country/' +
        this.state.searchCountry +
        '/' +
        this.state.searchOption +
        '/' +
        this.state.searchWord +
        '?page=' +
        page;
    }

    url += this.getOptions();
    console.log(url);
    this.doFetch(url);
  }

  getOptions() {
    var options = '';
    if (this.state.max > 0) {
      options += '&filter=price&max=' + this.state.max;
    }
    if (this.state.order !== '') {
      options += '&order=' + this.state.order;
    }
    if (this.state.sortByPrice) {
      options += '&sort=price';
    }
    return options;
  }

  async doFetch(url) {
    try {
      const response = await fetch(url);
      if (response.status !== 200) {
        alert(response.statusText);
        return;
      }
      response.json().then((data) => {
        this.setState({
          searchResults: data,
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  paginate(page) {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    this.getResults(page);
  }

  render() {
    return (
      <div>
        <Card className="mb-5" bg="light">
          <Card.Img variant="top" src={bgimage} />
          <Card.Body>
            <Card.Title className="text-center">Discover Apartments</Card.Title>
            <Container>
              <SearchFrom setStates={this.setStates}></SearchFrom>
            </Container>
          </Card.Body>
        </Card>
        <Results searchResults={this.state.searchResults} />
        <Paginate
          searchResults={this.state.searchResults}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default Discover;
