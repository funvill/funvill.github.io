---
title: Idea 052 - Landscape Table
date: 2023-03-20 00:52:00
categories: ideas YearOfIdeas
tags: map cnc furniture projects ideas
excerpt: A coffee table with a CNC topographical map with contour and elevation lines
---

> This post is part of [the 100 project ideas](/projects/2023-100-ideas/) project. [#The100DayProject](https://www.the100dayproject.org/). I am looking for feedback. <a href='#utterances-comments'>Comment</a> below or DM me via social media <a href="https://instagram.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-instagram" aria-hidden="true"></i><span class="label">Instagram</span></a>, <a href="https://twitter.com/funvill" rel="nofollow noopener noreferrer"><i class="fab fa-fw fa-twitter" aria-hidden="true"></i><span class="label">Twitter</span></a>.

## One Line Pitch

A coffee table with a CNC topographical map with contour and elevation lines

## Description

Use a CNC router to cut the contour and elevation lines of a topographic map.

About a 6 inch difference between the lowest point and the highest point. Use heavily layered plywood so that each layer is shown in the different levels. To get 6 inches of depth several layers of plywood will need to be glued together. Each layer of the plywood could be dyed beforehand similar to how a skateboard is constructed. This would give an extra level of detail.

Standoff pegs are placed at the corners of the table and a glass sheet can be placed on top to provide a flat surface.

This will require a tool change in the middle, from the roughing bit (down spiral bit) to the fine tipped bit (ball nose). I have never done this with a CNC machine before.

The XCarve that I currency own is capable of doing these kinds of maps.

I have made a few demo versions of this project using Bowen island for the example.

Here is one I made out of foam

<img src="/public/uploads/2023/topographical_foam.png" alt="topographical_foam" style="margin: 10px; border: 1px solid black; padding: 5px"/>

Same thing out of wood

<img src="/public/uploads/2023/topographical_wood.png" alt="topographical_wood" style="margin: 10px; border: 1px solid black; padding: 5px"/>

### Data

The data can be extracted from government survey data using GIS and converted into STL files. There are a few services that automate this process

- [TouchTerrain](https://touchterrain.geol.iastate.edu/main): Easily Create 3D-Printable Terrain Models - Updated frequently and I have been successful with using this software before. Works with Canadian data
- [Terrain2STL](https://jthatch.com/Terrain2STL/): Create STL models of the surface of Earth - Works but isn’t updated often.

Other

- [SRTMData](http://srtm.csi.cgiar.org/srtmdata/)
- [Geospatial Data Extraction](http://maps.canada.ca/czs/index-en.html) - This site can generate GeoTiff grayscale DEMs of smaller areas (sea to sky for example)
- The best source for DEM data outside the US is [earthexplorer](http://earthexplorer.usgs.gov/). It covers the whole earth.
- Moon - If you go to [MapPlanet](http://www.mapaplanet.org/) you can get data from the Moon, Mars and several other planets and moons.
- Found [OpenData for BC and its 1000s](http://www.data.gov.bc.ca/dbc/search/detail.page?ms=url%3Aapps.gov.bc.ca&recorduid=173523&title=Coastal%20BC%20Bathymetry) of data points to draw from. including Bathymetric data for BC coast lines. But I have to order the data (for free), I can’t just download it for some reason.
- [Bathymetric map data](http://www.naturalearthdata.com/downloads/10m-physical-vectors/) that works with tilemill 0m and 200m. It's a start but I need the in between data as well.
- [USGS](http://www.gelib.com/usgs-topographic-maps-2.htm) This will make an overlay for all the USA but not canada
- [Detailed Bathymetric/Bathymetry contour data (0-200M)](http://gis.stackexchange.com/questions/45334/detailed-bathymetric-bathymetry-data-0-200m) - The maps are getting better but I need more detailed Bathymetric maps of the area, so far i have only found layer 0 and layer 200. I am looking for more ranges between these two points.

<img src="/public/uploads/2023/topographical_virtual.png" alt="topographical_virtual" style="margin: 10px; border: 1px solid black; padding: 5px"/>

#### Tips

- Use a down spiral bit
- Use [conventional milling, not climb milling](https://www.youtube.com/watch?v=oTDb038sic8), [1](https://www.amanatool.com/46564-solid-carbide-cnc-foam-cutting-down-cut-square-end-spiral-1-8-dia-x-1-1-8-x-1-4-shank-x-2-1-2-inch-long-router-bit.html)

## Prior art

### Earth-Stripe table from Fluid Forms

<img src="/public/uploads/2023/topographical_desk.png" alt="topographical_desk" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>The Earth-Stripe table from Fluid Forms is an exceptional custom piece of furniture that wouldn't look out of place in an art and design gallery. It reflects the contours of any stretch of landscape you select. Designed by Stephen Williams and Hannes Walter, the Earth-Stripe table features a surface that shows the earth from above and you can shape it to your preferences. When you select a particular location on the table’s surface, the chosen landscape unfolds in a 3D model of your individual coffee table. When done, they carve out your selection with laminated wooden blocks. Austrian craftsmen further sand, oil and polish the surface. Above the selected landscape sits a pane of glass that makes for an even surface. The coffee mugs or anything else you place on the table seems to be floating above the different topographic layers. You can even [design a coffee table using Google Maps](http://www.bornrich.com/entry/earth-stripe-table-lets-you-enjoy-coffee-over-your-favorite-landscape/)

It even looks like they let you select the location of and make your own landscapes from their online editor. [Fluid-Earth-Pinstripe-Bowl](http://www.fluid-forms.com/design-your-own/Fluid-Earth-Pinstripe-Bowl)

### Below the boat

<img src="/public/uploads/2023/salishsea.png" alt="salishsea" style="float: right; margin: 10px; border: 1px solid black; padding: 5px"/>Here are some great [Bathymetric maps](http://en.wikipedia.org/wiki/Bathymetric_chart) laser cut they would make a much better coffee table then the topographical maps. [Salish Sea](http://www.belowtheboat.com/collections/frontpage/products/salish-sea)

#### Stacked sheets of wood

As interesting as it would be to mill it out of wood, i could also cut it on the laser cutter and stack the sheets on top of each other. [Topo map](http://thelasercutter.blogspot.ca/2011/10/topo-map.html), [Lo-Fi landscape](http://thelasercutter.blogspot.ca/2010/11/lo-fi-landscape.html), [Solar Topographies](http://thelasercutter.blogspot.ca/2010/02/solar-topographies.html)

<img src="/public/uploads/2023/stacked_wood.png" alt="stacked_wood" style="margin: 10px; border: 1px solid black; padding: 5px"/>

- [3D Topo Map Generation to CNC x-carve, Shapeoko 2](https://www.instructables.com/3D-Topo-Map-Generation-to-CNC-x-carve-Shapeoko-2/) - This article has some good helpful hints on setting up fusion 360 files
- [Create a Site Toporaphic Model Using a Laser Cutter](http://www.instructables.com/id/Create-a-Site-Toporaphic-Model-using-a-Laser-Cutte/)

## Market

People who like maps, or who are looking for interesting furniture.
