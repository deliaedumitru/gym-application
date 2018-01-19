import React, {Component} from 'react';
import './App.css';
import {Carousel} from 'react-bootstrap';
import gym from '../images/gym.jpg';
import pool from '../images/pool.jpg';
import trainer from '../images/personal-trainer.jpg';
import classes from '../images/classes.jpg';

export default class App extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <Carousel style={{display:'flex',alignItems:'center',justifyContent:'center'}} pauseOnHover={false}>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={gym}/>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={trainer}/>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={classes}/>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={pool}/>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}