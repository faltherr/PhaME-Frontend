import React, {Component} from 'react'
import {Carousel} from 'react-bootstrap'
import "../../styles/carousel.css"


export default class ControlledCarousel extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null
      };
    }

    componentDidMount = () => { this.setState({index:0}) }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction
      });
    }
  
    render() {
      const { direction } = this.state;
      return (
        <Carousel
          direction={direction}
          onSelect={this.handleSelect}
          interval={3000}
          pauseOnHover={true}
        >
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={require("../../images/landing-page/phame_flowchart.png")} />
            {/* <Carousel.Caption>
              <h3>Upload FASTQ Files and Perform Analysis</h3>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img width={700} height={300} alt="900x500" src={require("../../images/landing-page/phame_logo_art_1.png")} />
            {/* <Carousel.Caption>
              <h3>Detailed Phylogenetic Trees</h3>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img width={800} height={400} alt="900x500" src={require("../../images/landing-page/phame_logo_art_2.png")} />
            {/* <Carousel.Caption>
              <h3>Cusomizable graphical output</h3>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      );
    }
  }
