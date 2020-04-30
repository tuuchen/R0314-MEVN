import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab, Container } from 'react-bootstrap';
import { HouseDoor, Search, FolderPlus } from 'react-bootstrap-icons';
import Home from './components/Home';
import Discover from './components/Discover';
import Add from './components/Add';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="my-3">
        <Tabs className="justify-content-center mx-2" defaultActiveKey="home">
          <Tab
            className="mt-3"
            eventKey="home"
            title={
              <span>
                <HouseDoor />
                <span style={{ margin: '1em' }}>Home</span>
              </span>
            }
          >
            <Home />
          </Tab>
          <Tab
            className="mt-3"
            eventKey="discover"
            title={
              <span>
                <Search />
                <span style={{ margin: '1em' }}>Discover</span>
              </span>
            }
          >
            <Discover />
          </Tab>
          <Tab
            disabled
            className="mt-3"
            eventKey="add"
            title={
              <span>
                <FolderPlus />
                <span style={{ margin: '1em' }}>Add</span>
              </span>
            }
          >
            <Add />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default App;
