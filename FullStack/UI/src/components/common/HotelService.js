import React from 'react'
import { Card, Col, Container, Row} from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelService = () => {
  return (
    <>
        <Container className='mb-2'>
            <Header title={"Our Services"}></Header>
            <Row>
                <h4 className='text-center'>
                    Services at <span className='hotel-color'> Infinity Hotel</span>
                    <span className='gap-2'><FaClock /> - 24-Hour Front Desk</span>
                </h4>
            </Row>
            <hr />
            <Row xs={1} md={2} lg={2} className='g-4 mt-2'>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaWifi/> Wifi
                            </Card.Title>
                            <Card.Text>
                                Stay Connected with high speed internet access.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaUtensils/> Breakfast
                            </Card.Title>
                            <Card.Text>
                                Enjoy our delicious food served in your room
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={2}>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaCocktail/> Mini-Bar
                            </Card.Title>
                            <Card.Text>
                                Enjoy a refreshing drink or snack from our in-room mini-bar
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='hotel-color'>
                                <FaWifi/> Park
                            </Card.Title>
                            <Card.Text>
                                Park your car conveniently at our parking lot.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default HotelService