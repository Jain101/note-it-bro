import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:5000'; // Update with your Node.js server URL

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notes/search?term=${searchTerm}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error searching notes', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h1>Notes</h1>
        </Col>
        <Col md={4}>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <button type="button" className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        {notes.map((note) => (
          <Col key={note._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
