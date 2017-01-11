//util functions
function polar_to_cartesian(r,t) {  
    //radians to degrees, requires the t*pi/180
    var x = r * Math.cos((t*Math.PI/180));
    var y = r * Math.sin((t*Math.PI/180));
    return [x,y];
}

function cartesian_to_raster(x, y, w, h) {
    var rx = w/2 + x;
    var ry = h/2 + y;
    return [rx,ry];
}

function raster_to_cartesian(rx, ry, w, h) {
    var x = rx - w/2;
    var y = ry - h/2;
    return [x,y];
}

function polar_to_raster(r, t, w, h) {
    var xy= polar_to_cartesian(r, t);
    return cartesian_to_raster(xy[0], xy[1], w, h);
}

function init(title, h, w, radar_data) {

  $('#title').text(title);
	   
    var radar = d3.select('#radar')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    var radar_arcs = new Array(4);

    if (h >= w) {
        radar_arcs = [{'r':(w/2)*(1/4),'name':'Adopt'},
                        {'r':(w/2)*(2/4),'name':'Trial'},
                        {'r':(w/2)*(3/4),'name':'Assess'},
                        {'r':(w/2)*(4/4),'name':'Hold'}];
    } else {
        radar_arcs = [{'r':(h/2)*(1/4),'name':'Adopt'},
                        {'r':(h/2)*(2/4),'name':'Trial'},
                        {'r':(h/2)*(3/4),'name':'Assess'},
                        {'r':(h/2)*(4/4),'name':'Hold'}];
    }

    var numOfCircles = radar_arcs.length;
    var maxCircleRadius = radar_arcs[numOfCircles - 1].r;

    //quadrant lines -- vertical
    radar.append("line")
            .attr("x1", maxCircleRadius + (w - maxCircleRadius*2)/2)
            .attr("y1", (h - maxCircleRadius*2)/2)
            .attr("x2", maxCircleRadius + (w - maxCircleRadius*2)/2)
            .attr("y2", (maxCircleRadius * 2) + (h - maxCircleRadius*2)/2)
            .attr("stroke-width", 2)    
            .style("stroke", "#ccc");

    //quadrant lines -- vertical
    radar.append("line")
            .attr("x1", (w-(maxCircleRadius * 2))/2)
            .attr("y1", maxCircleRadius + (h - maxCircleRadius * 2)/2)
            .attr("x2", w - ((w- (maxCircleRadius * 2))/2))
            .attr("y2", maxCircleRadius + (h - maxCircleRadius * 2)/2)
            .attr("stroke-width", 2)    
            .style("stroke", "#ccc");


    // arcs
    var radarCircles = radar.selectAll("g")
        .data(radar_arcs)
        .enter()
        .append("g");

    radarCircles
        .append("circle")
        .attr("cx", w/2)
        .attr("cy", h/2)
        .attr("r", function (d) {return d.r;})
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("id", function (d) { 
            return "arc" + d.name;})

    radarFontSize = 16;
    radarCircles
        .append("text")
        .attr("xlink:href", function (d) {
            return "arc" + d.name})
        .text(function (d) {
            return d.name})
        .attr("y", function (d) {
            return w/2 - d.r + radarFontSize;
        })
        .attr("x", function (d) {
            return w/2 - (d.name.length * radarFontSize / 4) })
        .style("font", radarFontSize + "px solid black")
        .style("font-weight", "bold")

    //Quadrant Ledgends
    var blipSize = 10;
    var radar_quadrant_ctr=1;
    var quadrantFontSize = 18;
    var headingFontSize = 14;
    var stageHeadingCount = 0;
    var lastRadius = 0;
    var lastQuadrant='';
    var spacer = 6;
    var fontSize = 10;
    var total_index = 1;

    radarDataRadianChanceGeneration = {
        "Tools": {
            min: blipSize,
            max: 90 - blipSize,
        },
        "Platforms": {
            min: 90 + blipSize,
            max: 180 - blipSize,
        },
        "Languages & Frameworks": {
            min: 180 + blipSize,
            max: 270 - blipSize,
        },
        "Techniques": {
            min: 270 + blipSize,
            max: 360 - blipSize,
        }
    };

    radarDataLengthChanceGeneration = {
        "adopt": {
            min: blipSize,
            max: radar_arcs[0].r - blipSize,
        },
        "trial": {
            min: radar_arcs[0].r + blipSize,
            max: radar_arcs[1].r - blipSize,
        },
        "access": {
            min: radar_arcs[1].r + blipSize,
            max: radar_arcs[2].r - blipSize,
        },
        "hold": {
            min: radar_arcs[2].r + blipSize,
            max: radar_arcs[3].r - blipSize,
        }
    };

    for (var i = 0; i < radar_data.length; i++) {
        
        var itemsByArc = _.groupBy(radar_data[i].items, 'arc');
        var arcSections = _(itemsByArc).keys();

        var offsetIndex = 0;
        for (var index in arcSections) {
            var arcSection = arcSections[index];
            var radarBlips = radar.selectAll("div")
                .data(function () {
                    itemsByArc[arcSection].forEach(function (item) {
                        var polarLength = chance.integer({min: radarDataLengthChanceGeneration[arcSection].min, 
                            max: radarDataLengthChanceGeneration[arcSection].max})
                        var polarRadians = chance.integer({min: radarDataRadianChanceGeneration[radar_data[i].quadrant].min, 
                            max: radarDataRadianChanceGeneration[radar_data[i].quadrant].max})

                        item.radians = polarRadians;
                        item.length = polarLength;
                    });
                    return itemsByArc[arcSection]})
                .enter()
                .append("g");

            radarBlips.append("circle")
                .attr("r", function(d) { 
                    return ( d.blipSize !== undefined ? d.blipSize : blipSize );})
                .attr("cx", function(d) {
                    return polar_to_raster(d.length, d.radians, w, h)[0];})
                .attr("cy", function(d) { 
                    return h - polar_to_raster(d.length, d.radians, w, h)[1];})
                .attr("title", function(d) { return d.name;})
                .attr("angle", Math.PI)
                .style("cursor", function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
                .on("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}})
                .attr("stroke", radar_data[i].color)
                .style("fill", radar_data[i].color)
                .style("opacity", 0.7)

            radarBlips.append("text")
                .text(function(d) {
                    return total_index++;})
                .attr("x", function(d) { 
                    return polar_to_raster(d.length, d.radians, w, h)[0] - 2.5;})
                .attr("y", function(d) { 
                    return h - polar_to_raster(d.length, d.radians, w, h)[1] + 3;})
                .style("textBaseline", "middle")
                .style("font", "10px solid black")
                .style("font-color", "#000")
        }
    }
};


