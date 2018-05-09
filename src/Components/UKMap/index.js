import React, { Component } from 'react'
import { geoMercator, geoAlbers, geoPath } from 'd3-geo'
import './style.css'
import { LoadCarCharging } from '../../Helpers'
const width = 800
const height = 1200

class UKMap extends Component {
   constructor(props){
      super(props)
      this.state = {

      }
   }
   componentWillMount(){
      this.props.load()
      .then((mapData) => {
         this.setState({mapData})
      })
      .catch((err) => {
         return err
      })
   }
   createMap(){
      var projection = geoAlbers()
      .center([0, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(6000)
      .translate([width / 2, height / 2]);
      const pathGenerator = geoPath().projection(projection)
      if (this.state.mapData && this.state.mapData.features){
         const paths = this.state.mapData.features.map((d,i) => {
            return(
               <path
               key={'path' + i}
               d={pathGenerator(d)}
               className={'path ' + d.class}
               />
            )
         })
         return paths
      }
   }
   render() {
      return(
         <div className="ukContainer">   
          <h4>{this.props.title}</h4>
            <svg viewBox={`100 0 ${width} ${height}`}>
               {this.state.mapData && this.createMap()}
            </svg>
           
         </div>
      )
   }
}
export default UKMap