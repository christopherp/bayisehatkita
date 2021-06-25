import React, { Fragment } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const FormInputComponents = ({ months, text }) => {
    return (
    <Row >
        {months.map((month, index) => (
          <Fragment key={`${month}-${index}`}>
            <Col sm={2}>
              <Form.Group controlId={`${text}-${month}`}>
                <Form.Label>Bulan {month}</Form.Label>
                <Form.Control type="text"/>
              </Form.Group>
            </Col>
          </Fragment>
        ))}
      </Row>
    )
}

export default FormInputComponents;