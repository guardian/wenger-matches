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
				var margin = {top: 2, right: 20, bottom: 20, left: 2},
				    width = 300 - margin.left - margin.right,
				    height = 140 - margin.top - margin.bottom;

				var widthUnit = (Math.floor(width/options.maxValMatches));

				width = options.maxValMatches * widthUnit;


				var container=d3.select(options.container)
					.append("div")
					.attr("id", options.seasonContainer)
					.html(seasonHTML);    

				d3.select("#"+options.seasonContainer+" .info").html(data[0].season.split("_").join("-")); // set the season as title	


				var x = d3.scale.linear()
				    .range([0, width]);

				var y = d3.scale.linear()
				    .range([height, 0]);

				var xAxis = d3.svg.axis()
				    .scale(x)
				    .orient("bottom");

				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left")
				    .tickSize(width);

				var areaTop = d3.svg.area().interpolate("step-after")
				    .x(function(d,i) { return x(i); })
				    .y0(height/2)
				    .y1(function(d) { return y(d.For); });

				var areaBottom = d3.svg.area().interpolate("step-after")
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
 					var gy = svg.append("g")
				  		.attr("y", 2)
					    .attr("class", "y axis")
					    .attr("transform", "translate("+ width +", 0)")
					    .call(yAxis);

					gy.selectAll("g").filter(function(d) { return d; })
					    .classed("minor", true);

					svg.append("path")
					      .datum(options.arr)
					      .attr("class", "area-top")
					      .attr("d", areaTop );

				    svg.append("path")
					      .datum(options.arr)
					      .attr("class", "area-bottom")
					      .attr("d", areaBottom );   

				    svg.append("rect")
				    	.attr("class", "svg-overlay")
			              .attr("id", "svgOverlay")
			              .attr("width", (data.length-1) * widthUnit)
			              .attr("height", height)
			              .on("mousemove", mousemove);	 

			        var focus = svg.append("g")
			              .attr("class", "focus");
			              
			          focus.append("line")
			              .attr("x1", height)
			              .attr("x2", 0);//(width-margin.left-margin.right)/2       

				  // svg.append("g")
					 //    .attr("class", "x axis")
					 //    .attr("transform", "translate(0," + height/2 + ")")
					 //    .call(xAxis);

				  

					// gy.selectAll("text")
					//     .attr("x", 4)
					//     .attr("dy", -4);
			
		 		function mousemove() {  
			          stopPropagation();

			          var d = Math.round(x.invert(d3.mouse(this)[0]));

			          console.log(d, data[d])

			          var obj = data[d];

			          focus.select("g").attr("transform", "translate( "+d+" , 0 )");
			          focus.select("circle").attr("transform", "translate( "+ (width-margin.left-margin.right)/2 +" , "+ d3.mouse(this)[1] +" )");
			        
			          focus.select("line").attr("transform", "translate( 0 , "+ (d3.mouse(this)[1])+" )");
			        
			          svg.selectAll(".x.axis path").style("fill-opacity", Math.random()); // XXX Chrome redraw bug

			          //upDateMapView(obj[2].compDate)
			          //upDateTexts(obj[2])

			        }

			   //var offsets = data.map(function(t, i) { return [Date.UTC(t.date.getFullYear(), t.date.getMonth(), t.date.getDate()), t.lrCount, t]; });     

			   var stopPropagation = function() {
			        d3.event.stopPropagation();
			      }

		}
