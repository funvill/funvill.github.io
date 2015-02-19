---
layout: post
title: Working with Open Data, Maps and data.gov.bc.ca
date: 2013-01-06 20:43
author: funvill
comments: true
categories: [bathymetric, Canada, Development, maps, opendata]
---
This weekend I have been playing with more <a href="http://www.abluestar.com/blog/lasers-and-vancouver-opendata/">Open Data and Maps</a> using <a href="http://mapbox.com/tilemill/">TileMill</a>.Â SpecificallyÂ I been trying to make aÂ <a href="http://en.wikipedia.org/wiki/Bathymetric_chart">Bathymetric map</a> of theÂ <a href="http://en.wikipedia.org/wiki/Salish_Sea">Salish Sea</a> (BCÂ CoastalÂ waters)
<blockquote>A <strong>bathymetric</strong> chart is the submerged equivalent of an above-water topographic map. Bathymetric charts are designed to present accurate, measurable description and visual presentation of the submerged terrain.Â In an ideal case, the joining of a bathymetric chart and topographic map of the same scale and projection of the same geographic area would be seamless. The only difference would be that the values begin increasing after crossing the zero at the designated sea level datum. Thus the topographic map's mountains have the greatest values while the bathymetric chart's greatest depths have the greatest values. Simply put, the bathymetric chart is intended to show the land if overlying waters were removed in exactly the same manner as the topographic map.
<strong>Source</strong>:Â <a href="http://en.wikipedia.org/wiki/Bathymetric_chart">http://en.wikipedia.org/wiki/Bathymetric_chart</a></blockquote>
I have been struggling to findÂ Bathymetric data that coversÂ both Canada and USAÂ coastalÂ regions for the Salish Sea. The USA data is easy to find and highly detailed but finding data that matches up with Canadian data has been next toÂ impossible. Even finding data was difficult in the first place.

I was able to fine some low detail layers for <a href="http://www.naturalearthdata.com/downloads/10m-physical-vectors/">0 Meters and 200 Meter</a> for North AmericaÂ from <a href="http://naturalearthdata.com">naturalearthdata.com</a>Â  that are useful for plotting out the major elements.

I also found some highly detailed coastal layers fromÂ <a href="http://data.vancouver.ca/datacatalogue/index.htm">Vancouver Open Data</a>Â catalog that I used for the finer details aroundÂ Vancouver.

Next I addedÂ <a href="http://www.data.gov.bc.ca/dbc/search/detail.page?ms=url%3Aapps.gov.bc.ca&amp;recorduid=173523&amp;title=Coastal%20BC%20Bathymetry">Coastal BC Bathymetry</a>Â data fromÂ <a href="http://www.data.gov.bc.ca/dbc/index.page?">DataBC</a>Â but the files did not import in to TileMill correctly, and the "<em>Depth</em>"Â columnÂ gotÂ corrupted. SuperÂ annoyingÂ as it was the main column I wasÂ interestedÂ in. I had to spend a few hours learning about <a href="http://en.wikipedia.org/wiki/Shapefile">.shp and .dbf files</a>Â and wasÂ eventuallyÂ able to edit the file to make it work sort of.

<a href="http://www.abluestar.com/blog/wp-content/uploads/2013/01/BCMap-1024x719.png"><img class="size-thumbnail wp-image-3138 alignleft" alt="BCMap" src="http://www.abluestar.com/blog/wp-content/uploads/2013/01/BCMap-150x150.png" width="150" height="150" /></a>BC Open DataÂ catalogÂ isÂ weirdÂ in that I had to add the data to a shopping card, then "check out" the data with my email address and wait for a link to arrive in my email. The link cameÂ quicklyÂ taking at most 25mins. I still found the process strange as most of the other open data sites let me download it directly.

Currently I have only included theÂ CanadianÂ data as Its beenÂ exceedinglyÂ difficultÂ to match it up with the US data.

This map still needs a lot of work to get it right. I am expecting to have to do a lot of optimization inÂ <a href="http://inkscape.org/">InkScape</a>Â afterwards.Â Each colored layer will be a different layer of plywood Â and stacked on top of each other glued in to place with "Ground level" layer being the topÂ visibleÂ layer. I am still debating if I should leave all the little islands on the map as they willÂ dramaticallyÂ add to the complexity of the map.

<a href="http://www.abluestar.com/blog/wp-content/uploads/2013/01/bc_waterways-1024x842.png"><img class="size-thumbnail wp-image-3136 alignright" alt="bc_waterways" src="http://www.abluestar.com/blog/wp-content/uploads/2013/01/bc_waterways-150x150.png" width="150" height="150" /></a>I want to add some complexity to the top "<em>ground level</em>" layer so its not just a normal sheet. I was thinking about adding rivers and lakes to the top layer to add some details. I found the <a href="http://www.data.gov.bc.ca/dbc/search/detail.page?ms=url%3Aapps.gov.bc.ca&amp;recorduid=173918&amp;title=WSA%20-%20WATER%20POLYGON%20FEATURES%20(1:50K)">river data</a> on DataBC website.

<a href="http://www.abluestar.com/blog/wp-content/uploads/2013/01/lowermainland_water-1024x769.png"><img class="size-thumbnail wp-image-3137 alignleft" alt="lowermainland_water" src="http://www.abluestar.com/blog/wp-content/uploads/2013/01/lowermainland_water-150x150.png" width="150" height="150" /></a>The river data looksÂ beautifulÂ but toÂ complexÂ and there doesn't seem to be a way of differentiatingÂ between rivers and streams.

&nbsp;

&nbsp;
