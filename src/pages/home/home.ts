import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  * as Leaflet from 'leaflet';
import 'leaflet-draw';

declare const L:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map:any;
  data:any;
  estado:any;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit():void{
    this.drawMap();
  }

  drawMap(): void {
    this.map = Leaflet.map('map').setView([-1.2490800, -78.6167500], 2);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'AMW',
      maxZoom: 16
    }).addTo(this.map);
    var map = this.map;
    
    map.locate({ setView: true});

    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      Leaflet.marker(e.latlng).addTo(map)
          .bindPopup("Estás dentro de los " + radius + "metros desde este punto").openPopup();

      Leaflet.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);


    function addMarker(e) {

      var geojsonFeature = {
          "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "Point",
                  "coordinates": [e.latlng.lat, e.latlng.lng]
          }
      }
  
      var marker;
  
      L.geoJson(geojsonFeature, {
          
          pointToLayer: function(feature, latlng){
              
              marker = L.marker(e.latlng, {
                  
                  title: "Resource Location",
                  alt: "Resource Location",
                  riseOnHover: true,
                  draggable: true,
  
              }).bindPopup("<input type='button' value='Delete this marker' class='marker-delete-button'/>");
  
              marker.on("popupopen", onPopupOpen);
         
              return marker;
          }
      }).addTo(map);
    }

    function onPopupOpen() {

      var tempMarker = this;
  
      var marca = document.getElementsByClassName("marker-delete-button");

      for(var x = 0; x < marca.length; x++) {
        marca[x].addEventListener("click",function(){
          map.removeLayer(tempMarker);
        },false);
      }
    }

    map.on('click', addMarker);


    function onLocationError(e) {
      alert(e.message);
    }

    this.map.on('locationerror', onLocationError);
    
      
  }
    
}
