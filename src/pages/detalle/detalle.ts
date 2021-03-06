import { Component } from '@angular/core';
import {  NavController,
          NavParams,
          ViewController,
          AlertController} from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {
  image: string = "data:image/png;base64,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";
  point:any;
  enableButton:boolean=true;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController) {
    this.navCtrl = navCtrl;
    this.camera = camera;
    this.point=this.navParams.get("callback");
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }

  cancelNavPage(){
    this.viewCtrl.dismiss();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Eliminar Punto!',
      message: 'La información local sera eliminada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmar clicked');
            let data = { 'option': 0 };
            this.viewCtrl.dismiss(data);
          }
        }
      ]
    });
    alert.present();
  }

}
