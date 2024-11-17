import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

class PersonList extends Component {
    state = {
        persons: []
    };

    // Fetch data when the component mounts
    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(err => {
                console.error("Error fetching data: ", err);
            });
    }

    render() {
        return (
            <Container>
                <h1 className="text-center mt-4 mb-4" style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
                    User List
                </h1>
                <Row>
                    {this.state.persons.map((person, index) => (
                        <Col sm={12} md={6} lg={4} key={index} className="mb-4">
                            <Card style={{ backgroundColor: '#00bcd4', color: 'white' }}>
                                <Card.Body>
                                    <Row>
                                        <Col xs={4}>
                                            <Card.Img
                                                variant="top"
                                                src={person.picture.large}
                                                alt={`${person.name.first} ${person.name.last}`}
                                                className="rounded-circle"
                                            />
                                        </Col>
                                        <Col xs={8}>
                                            <Card.Title>
                                                {`${person.name.title} ${person.name.first} ${person.name.last}`}
                                            </Card.Title>
                                            <Card.Text>
                                                <strong>User Name:</strong> {person.login.username} <br />
                                                <strong>Gender:</strong> {person.gender.toUpperCase()} <br />
                                                <strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country}`} <br />
                                                <strong>Email:</strong> {person.email} <br />
                                                <strong>Phone:</strong> {person.phone} <br />
                                                <strong>Cell:</strong> {person.cell} <br />
                                                <strong>DOB:</strong> {new Date(person.dob.date).toLocaleDateString()} <br />
                                                <strong>Age:</strong> {person.dob.age} <br />
                                            </Card.Text>
                                            <Button variant="primary">Details</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default PersonList;
