import React, {Component} from 'react';
import './App.css';
import {Carousel} from 'react-bootstrap';
import gym from '../images/gym.jpg';
import pool from '../images/pool.jpg';
import trainer from '../images/personal-trainer.jpg';
import classes from '../images/classes.jpg';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"

const AnyReactComponent = ({text}) => <div>{text}</div>;
export default class App extends Component {
    static defaultProps = {
        center: {lat: 59.95, lng: 30.33},
        zoom: 11
    };

    componentDidMount() {
        console.log("component did mount home");
        window.scrollTo(0, 0);
    }

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{lat: 46.768427, lng: 23.591276}}
            >
                {props.isMarkerShown && <Marker position={{lat: 46.768427, lng: 23.591276}}/>}
            </GoogleMap>
        ));
        return (
            <div id='home-page-container'>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <Carousel style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                          pauseOnHover={false}>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={gym}/>
                        {/*<Carousel.Caption>*/}
                            {/*<h3>First slide label</h3>*/}
                            {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                        {/*</Carousel.Caption>*/}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={trainer}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={classes}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{width: '100%', maxHeight: 700}} src={pool}/>
                    </Carousel.Item>
                </Carousel>
                <div style={{
                    width: '100%',
                    // maxHeight: 800,
                    backgroundColor: 'rgba(250, 250, 250, 0.5)',
                    padding: 20,
                }}>
                    <div>
                        <br/>
                        <h2>About us</h2>
                        <br/>
                        Lorem ipsum dolor sit amet, case saepe expetendis ut vix, his ne zril dicunt appellantur. Cibo
                        noluisse signiferumque et has, denique gloriatur comprehensam ut quo. Per luptatum inimicus
                        accusamus no. Te essent postulant pri, iriure saperet splendide te per. Ius suscipit hendrerit
                        ullamcorper an, eam legimus prodesset scripserit et. No quo sale quidam.

                        Pri id verear dolores, ei posse vocibus eos. Iusto accusamus sea id. Iudicabit adipiscing
                        referrentur has ad, nam adhuc facilis probatus et, primis dicunt vix ex. Ius id altera virtute
                        tibique, eum cibo omnium omittam id, errem saepe delenit his at. Cu atqui molestiae sed, eam
                        magna
                        salutandi imperdiet te, id minimum salutatus delicatissimi vim. Alia cetero conclusionemque ut
                        his,
                        doctus oporteat suscipiantur vel ne.

                        Cum an unum liberavisse, rationibus mnesarchum quo ex, suas virtute ponderum ei quo. Diam congue
                        atomorum qui ei, sea et saepe iudicabit torquatos. Mei eu justo maiorum, nec odio concludaturque
                        no.
                        Quo adhuc rationibus ei. Modus dicat nostrud vim ne, est malis homero at.

                        Possit corrumpit et pri, eum quando molestie forensibus te. Habeo volumus tibique ne mei, consul
                        intellegat et nam. Mel ut nonumy dissentias, ea everti lucilius aliquando sit, eos sensibus
                        consequat cu. Mea cu meis dolore explicari, usu simul feugait in, vim ad agam deterruisset. Sale
                        aeque forensibus vix te, dico doming constituam eu eos, no modus molestie euripidis usu.
                    </div>

                    <div style={{
                        width: '100%',
                        // maxHeight: 450,
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 100,
                        paddingBottom: 15,
                    }}>
                        <div style={{width: '33%', marginLeft: 15, marginRight: 15}}>
                            <h3 style={{borderTop: '1px solid white', borderBottom: '1px solid white', padding: 15}}>
                                Location</h3>
                            <br/>
                            {/*<MyMapComponent*/}
                                {/*isMarkerShown*/}
                                {/*googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"*/}
                                {/*loadingElement={<div style={{height: `100%`}}/>}*/}
                                {/*containerElement={<div style={{width: '80%', height: `230px`}}/>}*/}
                                {/*mapElement={<div style={{height: `100%`}}/>}*/}
                            {/*/>*/}
                        </div>
                        <div style={{width: '33%', marginLeft: 15, marginRight: 15, fontSize: 16}}>
                            <h3 style={{borderTop: '1px solid white', borderBottom: '1px solid white', padding: 15}}>
                                Contact
                            </h3>
                            Pri id verear dolores, ei posse vocibus eos. Iusto accusamus sea id. Iudicabit adipiscing
                            referrentur has ad, nam adhuc facilis probatus et, primis dicunt vix ex. Ius id altera
                            virtute
                            tibique, eum cibo omnium omittam id, errem saepe delenit his at. Cu atqui molestiae sed, eam
                            magna
                        </div>
                        <div style={{width: '33%', marginLeft: 15, marginRight: 15, fontSize: 16}}>
                            <h3 style={{borderTop: '1px solid white', borderBottom: '1px solid white', padding: 15}}>
                                Program
                            </h3>

                            Monday - Friday : 6:00 AM - 10:00 PM <br/>
                            Saturday : 7:00 AM - 8:00 PM<br/>
                            Sunday : closed<br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}