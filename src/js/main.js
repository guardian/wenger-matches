import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'

import lodash from 'lodash'
import d3 from 'd3'
import moment from 'moment'
import 'moment/locale/en-gb';

import share from './lib/share';
import seasonChart from './components/seasonChart.js'

var _ = lodash;
var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');
var allMatches;
var allSeasons;
var maxValGoals, maxValMatches;

export function init(el, context, config, mediator) {
    iframeMessenger.enableAutoResize();
    el.innerHTML = mainHTML.replace(/%assetPath%/g, config.assetPath);

    reqwest({
        url: 'http://interactive.guim.co.uk/docsdata-test/17AHjnhRxUXLFLYlQVVpGkKTnJvNPnOPjz7utDj-U-Us.json',
        type: 'json',
        crossOrigin: true,
        success: (resp) => dataInit(resp) //el.querySelector('.test-msg').innerHTML = `Your sheets are served ${resp.sheets}`
    });

    [].slice.apply(el.querySelectorAll('.interactive-share')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');
        shareEl.addEventListener('click',() => shareFn(network));
    });

}

function dataInit(resp){
    maxValGoals = maxValMatches = 0;
    allMatches = resp.sheets.Sheet5;

    _.forEach(allMatches, function(match){
        match.DateFormat = new Date(manualDateFormat(match.Date)); 
        match.compDate = moment(match.DateFormat).format("YYYYMMDD");
        match.compDay = moment(match.DateFormat).format("DD");
        match.compMonth = moment(match.DateFormat).format("MM");
        match.compYear = moment(match.DateFormat).format("YYYY");
        match.season = getSeason(match.compYear, match.compMonth);
        match.For = parseInt(match.For);
        match.Against = parseInt(match.Against);

        // set global for graph axis
        if (maxValGoals < match.For){ maxValGoals = match.For };
        if (maxValGoals < match.Against){ maxValGoals = match.Against };
    })

    allSeasons = _.groupBy(allMatches, function(match) { return match.season })
    allSeasons = _.values(allSeasons); //lodash conversion of object to array 

    _.forEach(allSeasons, function(season){
         // set global for graph axis
       if (season.length > maxValMatches ){ maxValMatches = season.length }
    })

    addSeasonCharts(allSeasons);

}    

var getSeason = function(y,m){
    // check the month to add season var - season runs fron August to May
    var s;
    y = parseInt(y)
    if(m > 7 && m <= 12){ s = y +"_"+(y+1)}
    if(m > 0 && m < 6){ s = (y-1)+"_"+y }    
    return s;    
} 

function addSeasonCharts(allSeasons){

    _.forEach(allSeasons, function(season,i){
        var options = {};
        options.container = ".interactive-container";
        options.seasonContainer = "seasonDiv_"+i;
        options.maxValGoals = maxValGoals;
        options.maxValMatches = maxValMatches;
        options.arr = season;

        new seasonChart(options)
    })
}


function manualDateFormat(s){
    var a = s.split("/"); 
    s = a[1]+"-"+a[0]+"-"+a[2]

    return(s) 
}