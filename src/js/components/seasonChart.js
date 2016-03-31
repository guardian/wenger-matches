// <div id="seasonDiv_2"><div class="season-analysis">
// 	<div class="info">ciao ciao ciao</div>
// 	<h1></h1>
// 	<h2></h2>
// 	<!--<div class="match-chart"></div>-->
// 	<div class="matches clearfix"></div>
// </div></div>
//var svg = d3.select("#"+options.seasonContainer+" .matches").append("svg")



import seasonHTML from './templates/season.html!text'
		
	    // options.maxValGoals = maxValGoals;
     	// options.maxValMatches = maxValMatches;

		export default function seasonChart(d3, options) {
				//console.log(options)
				// this.extents;
				// this.startFrom=0;
				// this.season={};
				var data = options.arr;
				var margin = {top: 20, right: 20, bottom: 30, left: 50},
				    width = 960 - margin.left - margin.right,
				    height = 500 - margin.top - margin.bottom;

				var container=d3.select(options.container)
					.append("div")
					.attr("id", options.seasonContainer)
					.html(seasonHTML);    

				console.log(Math.floor(width/options.maxValMatches));	

				d3.select("#"+options.seasonContainer+" .info").html(data[0].season.split("_").join("-")); // set the season as title	


				var x = d3.time.scale()
				    .range([0, width]);

				var y = d3.scale.linear()
				    .range([height, 0]);

				var xAxis = d3.svg.axis()
				    .scale(x)
				    .orient("bottom");

				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left");

				var areaTop = d3.svg.area()
				    .x(function(d,i) { return x(i); })
				    .y0(height/2)
				    .y1(function(d) { return y(d.For); });

				var areaBottom = d3.svg.area()
				    .x(function(d,i) { return x(i); })
				    .y0(height/2)
				    .y1(function(d) { return y(d.Against * -1); });    
				

				var svg = d3.select("#"+options.seasonContainer+" .matches").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  	

				  x.domain([0 , options.maxValMatches]); 
				  y.domain([options.maxValGoals *-1, options.maxValGoals ]);

				  // console.log(x(d.d3Date))
 				
				  svg.append("path")
				      .datum(options.arr)
				      .attr("class", "area-top")
				      .attr("d", areaTop );

				   svg.append("path")
				      .datum(options.arr)
				      .attr("class", "area-top")
				      .attr("d", areaBottom );   

				  svg.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height/2 + ")")
				      .call(xAxis);

				  svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis)
				    .append("text")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 6)
				      .attr("x", height * -1)
				      .attr("dy", ".71em")
				      .style("text-anchor", "middle")
				      .text("Against") 
				   svg.append("g")  
				    .append("text")
				      .attr("transform", "rotate(-90)")
				      .attr("y", 6)
				      .attr("x", 0)
				      .attr("dy", ".71em")
				      .style("text-anchor", "middle")
				      .text("For");
			
		 		

		}
