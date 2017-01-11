function init(h,w, radar_data) {
  $('#title').text(document.title);  
	   
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

numOfCircles = radar_arcs.length;

//quadrant lines -- vertical
var maxCircleRadius = radar_arcs[numOfCircles - 1].r;

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
        return w/2 - d.r;
    })
    .attr("x", function (d) {
        return w/2 - (d.name.length * radarFontSize / 4) })
    .style("font", radarFontSize + "px solid black")
    .style("font-weight", "bold")

//Quadrant Ledgends
var radar_quadrant_ctr=1;
var quadrantFontSize = 18;
var headingFontSize = 14;
var stageHeadingCount = 0;
var lastRadius = 0;
var lastQuadrant='';
var spacer = 6;
var fontSize = 10;
var total_index = 1;

//TODO: Super fragile: re-order the items, by radius, in order to logically group by the rings.
for (var i = 0; i < radar_data.length; i++) {

    // group items by stage based on how far they are from each arc
    var itemsByStage = _.groupBy(radar_data[i].items, function(item) {
      for(var arc_i = 0; arc_i < radar_arcs.length; arc_i++) {
        if (item.pc.r < radar_arcs[arc_i].r) {
          return arc_i;
        }
      }
      return 0;
    });
    
    var offsetIndex = 0;
    for (var stageIdx in _(itemsByStage).keys()) {

    var radarBlips = radar.selectAll("div")
        .data(function () {
         console.log(itemsByStage[stageIdx]);
         return itemsByStage[stageIdx]})
        .enter()
        .append("g");

    radarBlips.append("circle")
        .attr("r", function(d) { 
            console.log(d)
            return ( d.blipSize !== undefined ? d.blipSize : 10 );})
        .attr("cx", function(d) { 
            console.log(polar_to_raster(d.pc.r, d.pc.t)[0]);
            return polar_to_raster(d.pc.r, d.pc.t)[0];})
        .attr("cy", function(d) { 
            console.log(h - polar_to_raster(d.pc.r, d.pc.t)[1]);
            return h - polar_to_raster(d.pc.r, d.pc.t)[1];})
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
            return polar_to_raster(d.pc.r, d.pc.t)[0] - 2.5;})
        .attr("y", function(d) { 
            return h - polar_to_raster(d.pc.r, d.pc.t)[1] + 3;})
        .style("textBaseline", "middle")
        .style("font", "10px solid black")
        .style("font-color", "#000")
        

    // radar.append("circle")
    //     .data(itemsByStage[stageIdx])
    //     .attr("r", function(d) { return ( d.blipSize !== undefined ? d.blipSize : 10 );})
    //     .attr("cx", function(d) { 
    //         return polar_to_raster(d.pc.r, d.pc.t)[0];})
    //     .attr("cy", function(d) { 
    //         return h - polar_to_raster(d.pc.r, d.pc.t)[1];})
    //     .attr("title", function(d) { return d.name;})
    //     .attr("angle", Math.PI)
    //     .style("cursor", function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
    //     .on("click", function(d) { if ( d.url !== undefined ){self.location =  d.url}})
    //     .attr("stroke", radar_data[i].color)
    //     .style("fill", radar_data[i].color)
    //     .attr("shape", function(d) {return (d.movement === 't' ? "triangle" : "circle");})
    //     .attr("anchor", "center")
    //         .append("text")
    //             .text(function(d) {
    //                 console.log(total_index);
    //                 return total_index++;})
    //             .style("textBaseline", "middle")
    //             .style("font-color", "#000")
    }
}
};
