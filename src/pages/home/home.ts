import { Component } from '@angular/core';
import { ModalController} from 'ionic-angular';

import {DetallePage} from '../detalle/detalle';
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

  constructor(public modalCtrl: ModalController) {
  }

  
  ngOnInit():void{
    this.drawMap(this.modalCtrl);
  }

  drawMap(d:any): void {
    this.map = Leaflet.map('map').setView([-1.26381445,-78.61347275], 14);
    Leaflet.tileLayer('assets/Tiles/{z}/{x}/{y}.png', {
      attribution: 'AMW',
      maxZoom: 18
    }).addTo(this.map);
    var map = this.map;
    
    map.locate({ setView: true});


    /*function onLocationFound(e) {
      var radius = e.accuracy / 2;

      Leaflet.marker(e.latlng).addTo(map)
          .bindPopup("Estás dentro de los " + radius + "metros desde este punto").openPopup();

      Leaflet.circle(e.latlng, radius).addTo(map);
    }*/

    //map.on('locationfound', onLocationFound);


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
              }).bindPopup("<input type='button' value='Detalles' class='btn marker-delete-button'/>");
              marker.on("popupopen", onPopupOpen);

              marker.on("drag", function(e) {
                  var marker = e.target;
                  var position = marker.getLatLng();
                  console.log(position);
                  map.panTo(new L.LatLng(position.lat, position.lng));
              });
              return marker;
          }
      }).addTo(map);
    }

    function onPopupOpen() {

   
      var tempMarker = this;
      console.log("Punto");
      console.log(tempMarker);
      var marca = document.getElementsByClassName("marker-delete-button");

      for(var x = 0; x < marca.length; x++) {
        marca[x].addEventListener("click",function(){

          let profileModal = d.create(DetallePage, { callback: tempMarker });
          profileModal.onDidDismiss(data => {
            if(data){
              if(data.option===0){
                map.removeLayer(tempMarker);
              }
            }
            

          });
          profileModal.present();
          
         
        },false);
      }
    }

    map.on('click', addMarker);


    /*function onLocationError(e) {
      alert(e.message);
    }

    this.map.on('locationerror', onLocationError);*/
    
  }

  onPageWillEnter(){
   alert("s");
  } 
    
}
