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

function getColor(angle, quadrantData) {
  var color;
  var colorMap = {};
  quadrantData.forEach(function (quadrant) {
    colorMap[quadrant.upperAngle] = quadrant.color;
  });

  angleMultiple = Math.ceil(angle/90) * 90;
  return colorMap[angleMultiple];
};

function init(data) {
  $('#title').text(data.title);
  var radar_arcs = new Array(data.arcs.length);

  data.arcs.forEach(function (arc, index) {
    var r = data.arcDistanceInPixel * arc.order;
    var name = arc.title || '';
    radar_arcs[index] = {r: r, name: name};
  });

  var w = (data.arcDistanceInPixel * data.arcs.length) * 2;
  var h = (data.arcDistanceInPixel * data.arcs.length) * 2;
  var radar = d3.select('#radar')
    .append('svg')
    .attr('viewBox', '0 0 ' + w + ' ' + h);
  var maxCircleRadius = data.arcDistanceInPixel * data.arcs.length;

  //quadrant lines -- vertical
  radar.append("line")
          .attr("x1", maxCircleRadius)
          .attr("y1", 0)
          .attr("x2", maxCircleRadius)
          .attr("y2", h)
          .attr("stroke-width", 2)
          .style("stroke", "#ccc");

  //quadrant lines -- vertical
  radar.append("line")
          .attr("x1", 0)
          .attr("y1", maxCircleRadius)
          .attr("x2", w)
          .attr("y2", maxCircleRadius)
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
        return "arc" + d.name;
      });

  radarFontSize = 18;
  radarCircles
      .append("text")
      .attr("xlink:href", function (d) {
        return "arc" + d.name})
      .text(function (d) {
        return d.name})
      .attr("x", function (d) {
        return w/2 + (d.r - data.arcDistanceInPixel) + 4; // 4 is a magic number for extra padding
      })
      .attr("y", function (d) {
        return w/2 - (radarFontSize / 2);
      })
      .style("font-size", radarFontSize + "px")
      .style("font-family", "Verdana")
      .style("font-weight", "bold");

    //Quadrant Legends
  var blipSize = 15;
  var radar_quadrant_ctr=1;
  var quadrantFontSize = 18;
  var headingFontSize = 14;
  var stageHeadingCount = 0;
  var lastRadius = 0;
  var lastQuadrant='';
  var spacer = 6;
  var fontSize = 12;
  var total_index = 1;

  var radarBlips = radar.selectAll("div")
      .data(function () {
        return data.spots})
      .enter()
      .append("g")
      .attr('class', 'plot-point');

  radarBlips.append("circle")
      .attr("r", function(d) {
        return ( d.blipSize !== undefined ? d.blipSize : blipSize );})
      .attr("cx", function(d) {
        return polar_to_raster(d.placements[0].coordinates.radius, d.placements[0].coordinates.angle, w, h)[0];})
      .attr("cy", function(d) {
        return h - polar_to_raster(d.placements[0].coordinates.radius, d.placements[0].coordinates.angle, w, h)[1];})
      .attr("title", function(d) { return d.name;})
      .attr("angle", Math.PI)
      .style("cursor", function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
      .on("click", function(d) {
        if ( d.url !== undefined ){
          self.location =  d.url
        }
      })
      .style("fill", function (d) {
        return getColor(d.placements[0].coordinates.angle, data.quadrants);
      });

  radarBlips.append("text")
      .text(function(d) {
        return d.id;})
      .attr("x", function(d) {
        var offset;
        if (d.id < 10) {
          offset = 3.5;
        } else if (d.id > 10 && d.id < 100) {
          offset = 7;
        } else if (d.id >= 100) { // equal or greater than
          offset = 10.5;
        }
        return polar_to_raster(d.placements[0].coordinates.radius, d.placements[0].coordinates.angle, w, h)[0] - offset;
      })
      .attr("y", function(d) {
        return h - polar_to_raster(d.placements[0].coordinates.radius, d.placements[0].coordinates.angle, w, h)[1] + (fontSize / 4);})
      .on("click", function(d) {
        if ( d.url !== undefined ){
          self.location =  d.url
        }
      })
      .style("cursor", function(d) { return ( d.url !== undefined ? "pointer" : "auto" ); })
      .style("textBaseline", "middle")
      .style("font-family", "Open Sans")
      .style('font-size', fontSize + 'px')
      .style("fill", "#FFF")
};
