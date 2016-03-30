// <div id="seasonDiv_2"><div class="season-analysis">
// 	<div class="info">ciao ciao ciao</div>
// 	<h1></h1>
// 	<h2></h2>
// 	<!--<div class="match-chart"></div>-->
// 	<div class="matches clearfix"></div>
// </div></div>


import seasonHTML from './templates/season.html!text'

var margin = {top: 8, right: 10, bottom: 2, left: 10},
	    width = 960 - margin.left - margin.right,
	    height = 69 - margin.top - margin.bottom;

	    // options.maxValGoals = maxValGoals;
     //    options.maxValMatches = maxValMatches;

		export default function seasonChart(options) {
				var parseDate = d3.time.format("%b %Y").parse;

				var unitW = Math.floor(width/options.maxValMatches);
				var unitH = Math.floor(height/(options.maxValGoals * 2));

				var x = d3.scale.linear()
			    	.range([0, width]);

				var y = d3.scale.linear()
				    .range([height, 0]);

				x.domain([ 0, options.maxValMatches ]);    

				var area = d3.svg.area()
				    .x(function(d) { return x(d.date); })
				    .y0(height)
				    .y1(function(d) { return y(d.For); });

				var line = d3.svg.line()
				    .x(function(d) { return x(d.date); })
				    .y(function(d) { return y(d.price); });    


				this.extents;
				this.startFrom=0;
				this.season={};
				this.data=options.arr;
				this.options=options;

				var container=d3.select(options.container)
					.append("div")
					.attr("id", options.seasonContainer)
					.html(seasonHTML);

				console.log(this.data.length, "convert data to d3 usable json here https://bl.ocks.org/mbostock/9490313")

				d3.select("#"+options.seasonContainer+" .info")  //d3.select("#"+options.seasonContainer+" h1")
			 		.html(this.data[0].season.split("_").join("–"))

			 	var svg = d3.select("#"+options.seasonContainer+" .matches").append("svg")
			 		.data(options.arr)
			 		  .enter().append("svg")
				      .attr("width", width + margin.left + margin.right)
				      .attr("height", height + margin.top + margin.bottom)
				    .append("g")
				      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				      .each(multiple);

						function multiple(symbol) {
						  var svg = d3.select(this);

						  y.domain([0, options.maxValGoals *2 ]);

						  svg.append("path")
						      .attr("class", "area")
						      .attr("d", area(symbol.values));

						  svg.append("path")
						      .attr("class", "line")
						      .attr("d", line(symbol.values));
						}

					function type(d) {
						  d.price = +d.price;
						  d.date = parseDate(d.date);
						  return d;
						}
		 		

		}
