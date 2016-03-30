// <div id="seasonDiv_2"><div class="season-analysis">
// 	<div class="info">ciao ciao ciao</div>
// 	<h1></h1>
// 	<h2></h2>
// 	<!--<div class="match-chart"></div>-->
// 	<div class="matches clearfix"></div>
// </div></div>


import seasonHTML from './templates/season.html!text'

export default function seasonChart(options) {
	console.log(options)

	var container=d3.select(options.container)
		.append("div")
		.attr("id", options.seasonContainer)
		.html(seasonHTML);

	this.extents;
	this.startFrom=0;
	this.season={};
	this.data=options.arr;
	this.options=options;

	d3.select("#"+options.seasonContainer+" .info")  //d3.select("#"+options.seasonContainer+" h1")
 		.html(this.data[0].season.split("_").join("–"))

}
