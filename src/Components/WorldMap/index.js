import React, { Component } from 'react'
import worlddata from './world'
import { geoMercator, geoPath } from 'd3-geo'
import './style.css'

class WorldMap extends Component {

   createMap(){
      const projection = geoMercator()
      const pathGenerator = geoPath().projection(projection)
      const countries = worlddata.features.map((d,i) => {
         return(
            <path
            key={'path' + i}
            d={pathGenerator(d)}
            className='countries'
            />
         )
         }
      )
      return countries
   }
   render() {
     
   return(
      <div className="world">
      <svg viewBox="0 0 1000 450">
         {this.createMap()}
      </svg>
      </div>
   )
   }
}
export default WorldMap