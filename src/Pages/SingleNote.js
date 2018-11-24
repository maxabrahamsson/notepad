import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class SingleNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    const { data } = this.state;
    if (data.length === 0) return <div />;
    return (
      <Container>
        <Row>
          <Col md={12} className="d-flex justify-content-center">
            <Button variant="primary" onClick={this.exportPDF}>
              Download PDF
            </Button>
          </Col>
          <Col md={12} />
        </Row>
      </Container>
    );
  }
}

export default SingleNote;
