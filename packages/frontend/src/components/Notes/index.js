import React, { Component } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Button from 'react-bootstrap/lib/Button';
import Card from 'react-bootstrap/lib/Card';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Form from 'react-bootstrap/lib/Form';
import { compose } from 'recompose';

import withBackend from '../../withBackend';
import { AuthUserContext, withAuthorization } from '../Session';

class NotesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      message: '',
      messageIdToUpdate: null,
    };
  }

  async recordText() {
    const { message, messageIdToUpdate } = this.state;
    const { backend } = this.props;
    if (messageIdToUpdate === null) {
      await backend.putDataToDB(message);
    } else {
      await backend.updateDB(messageIdToUpdate, message);
    }
    this.setState({ messageIdToUpdate: null, message: '' });
    this.refreshUI();
  }

  render() {
    const { data, message, messageIdToUpdate } = this.state;
    const { backend } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
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
                          placeholder="Write a note"
                          value={message}
                        />
                      </Form.Group>
                    </Card.Title>
                    <Button
                      onClick={() => {
                        this.recordText();
                      }}
                    >
                      {messageIdToUpdate === null ? 'Add' : 'Save'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              {data.length <= 0
                ? 'You have not taken any notes.'
                : data.map((dat, i) => (
                  <Col md={12} key={`key${i}`}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{dat.message}</Card.Title>
                        <Button
                          variant="danger"
                          onClick={() => {
                            backend.deleteFromDB(dat._id);
                            this.refreshUI();
                          }}
                        >
                            Delete
                        </Button>
                        <Button
                          variant="info"
                          onClick={() => this.setState({ messageIdToUpdate: dat._id, message: dat.message })
                            }
                        >
                            Edit
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        )}
      </AuthUserContext.Consumer>
    );
  }

  componentDidMount() {
    this.refreshUI();
  }

  async refreshUI() {
    const { backend } = this.props;
    backend.getDataFromDb().then(res => this.setState({ data: res }));
  }
}

const condition = authUser => !!authUser;

export default compose(
  withBackend,
  withAuthorization(condition),
)(NotesPage);
