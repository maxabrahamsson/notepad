import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/lib/Container';
import Button from 'react-bootstrap/lib/Button';
import Card from 'react-bootstrap/lib/Card';
import CardColumns from 'react-bootstrap/lib/CardColumns';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-bootstrap/lib/Form';

class Main extends Component {
  // initialize our state
  state = {
    data: [],
    message: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      onChange={e => this.setState({ message: e.target.value })}
                      placeholder="add something in the database"
                    />
                  </Form.Group>
                </Card.Title>
                <Button onClick={() => this.putDataToDB(this.state.message)}>Save</Button>
              </Card.Body>
            </Card>
          </Col>
          {data.length <= 0
            ? 'You have not taken any notes.'
            : data.map(dat => (
              <Col md={12}>
                <Card>
                  <Card.Body>
                    <Card.Title>{dat.message}</Card.Title>
                    <Button variant="danger" onClick={() => this.deleteFromDB(dat._id)}>
                        Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply)}>
            UPDATE
          </button>
        </div>
      </Container>
    );
  }

  componentDidMount() {
    this.refreshUI();
  }

  refreshUI() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch('/api/getData')
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  putDataToDB = (message) => {
    axios.post('/api/putData', {
      message,
    });
    this.refreshUI();
  };

  deleteFromDB = (idTodelete) => {
    axios.delete('/api/deleteData', {
      data: {
        _id: idTodelete,
      },
    });
    this.refreshUI();
  };

  updateDB = (idToUpdate, updateToApply) => {
    axios.post('/api/updateData', {
      id: idToUpdate,
      update: { message: updateToApply },
    });
    this.refreshUI();
  };
}

export default Main;
