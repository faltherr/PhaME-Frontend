import React, {Component} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/carousel.css"
import { Carousel } from 'react-responsive-carousel';

export default class LandingCarousel extends Component{
    render() {
        return (
            <Carousel autoPlay={false} infiniteLoop={true}>
                <div>
                    <img src={require("../../images/landing-page/phame_flowchart.png")} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={require("../../images/landing-page/phame_logo_art_1.png")} style={{'height': 'auto', "width": '100%', "max-height": '600px'}} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={require("../../images/landing-page/phame_logo_art_2.png")} style={{"height": "auto", "width": "100%"}} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        );
    }
};