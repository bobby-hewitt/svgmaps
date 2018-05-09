import { UKByConstituency, UKByLA } from '../Maps'
import { CarCharginPoints, IMD } from '../Data'

export const LoadCarCharging = () => {
	return new Promise((resolve, reject) => {
		var d = CarCharginPoints
		const f = UKByConstituency.features
		let keys = Object.keys(d.parliamentary_constituency)
		const bands = [0,3,6,9,12,15,18,21,24,27,30]
		for (var i =0; i < keys.length; i++){
			var constituency = UKByConstituency.features.find(c => c.properties.PCON13CD === keys[i])
				if (constituency) {
				constituency.number = d.parliamentary_constituency[keys[i]]
				for (var j = 0; j < bands.length; j++){
				   if (constituency.number > bands[j]){
				       constituency.class = 'band' + j
				       // console.log(constituency.class)
				       
				   }
				}
			}
		}
		resolve(UKByConstituency)
	})  
}

export const LoadIMD = () => {
	return new Promise((resolve, reject) => {
	
		const f = UKByLA.features
		const n = IMD.length / 10

		const bands = [0,n*1,n*2,n*3,n*4,n*5,n*6,n*7,n*8,n*9]
		for (var i =0; i < IMD.length; i++){
			
			var la = UKByLA.features.find(c => c.properties.LAD13CD === IMD[i]["Local Authority District code (2013)"])
				if (la) {
				la.number = IMD[i]["IMD - Rank of average rank"]
				for (var j = 0; j < bands.length; j++){
				   if (la.number > bands[j]){
				       la.class = 'band' + (9-j)
				       // console.log(constituency.class)
				       
				   }
				}
			}
		}
		resolve(UKByLA)
	})  
}