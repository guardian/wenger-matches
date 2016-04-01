// <div id="seasonDiv_2"><div class="season-analysis">
// 	<div class="info">ciao ciao ciao</div>
// 	<h1></h1>
// 	<h2></h2>
// 	<!--<div class="match-chart"></div>-->
// 	<div class="matches clearfix"></div>
// </div></div>
//var svg = d3.select("#"+options.seasonContainer+" .matches").append("svg")


import seasonHTML from './templates/season.html!text'
import Tooltip from './Tooltip'


		export default function seasonChart(d3, options, margin) {

				var width = 300 - margin.left - margin.right, height;
				
				var data = options.arr;				

				var widthUnit = width/options.maxValMatches;//(Math.floor(width/options.maxValMatches))

				width = (options.maxValMatches * widthUnit);

				height = ((options.maxValGoals*2)*widthUnit)

				var container=d3.select(options.container)
					.append("div")
					.attr("id", options.seasonContainer)
					.attr("class", "season-container")
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

				var areaTop = d3.svg.area().interpolate("step")
				    .x(function(d,i) { return x(i); })
				    .y0(height/2)
				    .y1(function(d) { return y(d.For); });

				var areaBottom = d3.svg.area().interpolate("step")
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
			              .on("mousemove", mousemove)	
			         .on("mouseleave", mouseleave)   

			        var focus = svg.append("g")
			              .attr("class", "focus");
			              
			          // focus.append("line")
			          //     .attr("y1", height)
			          //     .attr("y2", height-10)
			          //     .attr("class","focus-line");

			          focus.append("circle")
			           		.attr("r", 3)
	          				.attr("transform", "translate( 0 , 0 )");	   

				var el = document.getElementById(options.seasonContainer);
				var focusEl = el.getElementsByClassName("focus")[0];
			    var arseEl = el.getElementsByClassName("area-top")[0];
			    var nonArseEl = el.getElementsByClassName("area-bottom")[0];

				var tooltipPartnership = new Tooltip({ container: el, margins:margin, title: false, indicators:[
                            {
                              title:"Leader",
                              id:"govLeader"
                              
                            },
                            {
                              title:"Party",
                              id:"govParty"
                              
                            }
                    ] })  
			
		 		function mousemove() {  
			          stopPropagation();
			          
					  var xPos = d3.mouse(this)[0];
					  var yPos = (height)*-1;

			          var d = Math.round(x.invert(xPos));
			          var obj = data[d];
					  //console.log(this.y, xPos, d, obj);

			          focus.select("g").attr("transform", "translate( "+ d +" , 0 )");
			          focus.select("circle").attr("transform", "translate( "+ xPos+" "+height/2+" )");
			          //focus.select("line").attr("transform", "translate( "+ xPos+" 0 )");
			          focus.style("display","block");
			        
			          svg.selectAll(".x.axis path").style("fill-opacity", Math.random()); // XXX Chrome redraw bug

			          tooltipPartnership.show(obj, xPos, yPos);
					  nonArseEl.classList.add("non-arse-highlight");
			          arseEl.classList.add("arse-highlight");
			          

			          console.log(arseEl)

			        }

			     function mouseleave(){
		              		tooltipPartnership.hide();
		              		focus.style("display","none");
		              		arseEl.classList.remove("arse-highlight");
			          		nonArseEl.classList.remove("non-arse-highlight");
		            }    

			   //var offsets = data.map(function(t, i) { return [Date.UTC(t.date.getFullYear(), t.date.getMonth(), t.date.getDate()), t.lrCount, t]; });     

			   var stopPropagation = function() {
			        d3.event.stopPropagation();
			      }

			    

		}
