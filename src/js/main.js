import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'
import lodash from 'lodash'
import moment from 'moment'
import 'moment/locale/en-gb';

var _ = lodash;
var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');
var allMatches;
var allSeasons;

export function init(el, context, config, mediator) {
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
    allMatches = resp.sheets.Sheet5;

    _.forEach(allMatches, function(match){
        match.DateFormat = new Date(manualDateFormat(match.Date)); 
        match.compDate = moment(match.DateFormat).format("YYYYMMDD");
        match.compMonth = moment(match.DateFormat).format("MM");
        match.compYear = moment(match.DateFormat).format("YYYY");
        match.season = getSeason(match.compYear, match.compMonth);

        
    })
    


    allSeasons = _.groupBy(allMatches, function(match) { return match.season })

    allSeasons = _.values(allSeasons); //convert to array of arrays

    console.log(allSeasons.length)
}    

var getSeason = function(y,m){
    var s;
    y = parseInt(y)
    if(m > 7 && m <= 12){ s = y +"_"+(y+1)}
    if(m > 0 && m < 6){ s = (y-1)+"_"+y }    
    return s;    
} 


function manualDateFormat(s){
    var a = s.split("/"); 
    s = a[1]+"-"+a[0]+"-"+a[2]

    return(s) 
}