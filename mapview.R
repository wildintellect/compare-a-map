# Generate compare a map using mapview
library(mapview)
library(leafsync)
library(leaflet)

center <- c(x=-121.73626,y=38.55515)
m1 <- mapView(map.types = "Esri.WorldImagery")
m2 <- mapView(map.types = "OpenStreetMap")
m3 <- mapView(map.types = "Esri.WorldImagery")
m4 <- mapView(map.types = "Esri.WorldImagery")

leafsync::sync(m1, m2, m3, m4)
