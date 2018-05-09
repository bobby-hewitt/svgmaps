const express = require('express')
const request = require('request')
const app = express()
var PostcodesIO = require('postcodesio-client');
var postcoder = new PostcodesIO();
var fs = require("fs");
var devices = require('./object.js')
var postcodes = require('./postcodes')
var dd = require('./districtData')
var finalData = require('./byArea.js')
// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(9000, () => console.log('Example app listening on port 9000!'))
getData()
// const url = 'https://data.gov.uk/api/action/package_search?fq=res_format:JSON'
function getData(){
	// lookupPostcodes()
		testApi()
		function getDataAndCreateObject(){
			
	
		}

		function testApi(){
			// const url = 'https://data.gov.uk/api/action/package_list?fq=core_dataset:true&res_format:JSON'
			const url ='https://data.gov.uk/api/action/package_search?fq=res_format:JSON'
			request(url, function (error, response, body) {
				if (error){
					return console.log(error)
				}
				// console.log(body)
				let res = JSON.parse(body)
				delete res.result.results
				console.log(res)
				// console.log(res.result.results[3])
				// for (var i = 0;  i < res.result.results.length; i++){
				// 	console.log(res.result.results[i].name)
				// }
				// console.log(res.result.results)
			})
		}

		function searchDataSets(){
			const url = 'https://data.gov.uk/api/action/package_search?fq=res_format:JSON&core_dataset:true'

			// const url = 'http://chargepoints.dft.gov.uk/api/retrieve/registry/format/json'
			
			request(url, function (error, response, body) {
				if (error){
					return console.log(error)
				}
				let res = JSON.parse(body)
				const results = res.result.results
				for (var i = 0; i < results.length; i++){
					console.log(results[i].name)
				}
			})
		}
	
	

		function retrievePostcodesFromObject(){
			var postcodes = {
	 			postcodes: []
	 		}
		 	for (var i = 0; i < devices.ChargeDevice.length; i++){
		 		postcodes.postcodes.push(devices.ChargeDevice[i].ChargeDeviceLocation.Address.PostCode)
		 	}
		 	createJSON('postcodes.js', postcodes)
	 	}

	 	function lookupPostcodes(){
	 	var allResults = {
	 		data: []
	 	}
	 	for (var i = 0; i < postcodes.postcodes.length; i++){
	 		console.log(postcodes.postcodes[i])
		 	postcoder.lookup(postcodes.postcodes[i]).then(postcode => {
		 		if (postcode){
					allResults.data.push(postcode)
					console.log('pushing')
				}
			}).catch((err) => {
				return 
			})
	 	}
	 	setTimeout(() => {
	 		createJSON('districtData.js', allResults)
	 	},1000 * 20 )

	 	}
	 	
}

// useData()

function useData(){
	const d = dd.data 
	console.log(d[0])
	var newData = {
		lsoa:{},
		msoa:{},
		admin_district:{},
		admin_county:{},
		admin_ward:{},
		parliamentary_constituency:{},
	}
	for (var i = 0 ; i < d.length; i++){
		//lsoa
		if (newData.lsoa[d[i].lsoa]){
			newData.lsoa[d[i].lsoa] += 1
		} else if (d[i].codes){
			newData.lsoa[d[i].lsoa] = 1
		}
		//msoa
		if (newData.msoa[d[i].msoa]){
			newData.msoa[d[i].msoa] += 1
		} else {
			newData.msoa[d[i].msoa] = 1
		}
		//district
		if (d[i].codes && newData.admin_district[d[i].codes.admin_district]){
			newData.admin_district[d[i].codes.admin_district] += 1
		} else if (d[i].codes){
			newData.admin_district[d[i].codes.admin_district] = 1
		}
		//county
		if (d[i].codes && newData.admin_county[d[i].codes.admin_county]){
			newData.admin_county[d[i].codes.admin_county] += 1
		} else if (d[i].codes){
			newData.admin_county[d[i].codes.admin_county] = 1
		}
		//ward
		if (d[i].codes && newData.admin_ward[d[i].codes.admin_ward]){
			newData.admin_ward[d[i].codes.admin_ward] += 1
		} else if (d[i].codes){
			newData.admin_ward[d[i].codes.admin_ward] = 1
		}
		//parliamentary_constituency
		if (d[i].codes && newData.parliamentary_constituency[d[i].codes.parliamentary_constituency]){
			newData.parliamentary_constituency[d[i].codes.parliamentary_constituency] += 1
		} else if (d[i].codes){
			newData.parliamentary_constituency[d[i].codes.parliamentary_constituency] = 1
		}
	}
	createJSON('byArea.js', newData)
}
// exploreData()

// function exploreData(){
// 	console.log(finalData.parliamentary_constituency)
// }

function createJSON(fn, obj){
	fs.writeFile(fn, JSON.stringify(obj), (err) => {
	    if (err) {
	        console.error(err);
	        return;
	    };
	    console.log("File has been created");
	});
}


function lookupPostcodes(p){
	


}

// console.log('hello')