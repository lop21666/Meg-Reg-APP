import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilData: any;
  urlFoto: any;
  mostrarData = false;
  profileForm: FormGroup;
  items = Array(3);
  myImage = null;
  // eslint-disable-next-line max-len
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private userService: UserService, private storage: Storage, private alertService: AlertService,
    private navCtrl: NavController) {
      this.profileForm = this.createFormGroup();
    }

    get nombre() { return this.profileForm.get('nombre'); }
    get mail() { return this.profileForm.get('mail'); }
    get telefono() { return this.profileForm.get('telefono'); }
    get pais() { return this.profileForm.get('pais'); }

  ngOnInit() {
  }

  async ionViewWillEnter() {

  this.getData();

  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      telefono: new FormControl('', [Validators.required]),
      pais: new FormControl({
        value: '',
        disabled: true
      }, [Validators.required])
    });
  }

  defaultValue( perfilData ){
    this.profileForm.controls.nombre.setValue(perfilData.nombre);
    this.profileForm.controls.mail.setValue(perfilData.mail);
    this.profileForm.controls.telefono.setValue(perfilData.telefono);
    this.profileForm.controls.pais.setValue(perfilData.pais_nombre);
  }

  async getData() {
    (await this.userService.getPerfil()).subscribe((resp: any) => {
      if (resp.status){
        this.perfilData = resp.data;
        this.defaultValue( this.perfilData );
        this.urlFoto = resp.data.foto;
        this.mostrarData = true;
      }else{
        this.alertService.presentAlert('Ha ocurrido un error en el servidor, intente de nuevo más tarde.')
      }
    });
  }

  clean(){
    this.profileForm.reset();
  }

  async editProfile(){
    const datosUsuario = await this.storage.get('datos');
    if ( datosUsuario ) {
    await (await this.userService.editProfile( this.profileForm.value.nombre, this.profileForm.value.mail,
          this.profileForm.value.telefono)).
      subscribe((resp: any) => {
        if (resp.status){
          this.mostrarData = false;
          this.alertService.presentToast('Registro actualizado!', 'dark', 2500);
          this.getData();
        }else{
          this.alertService.presentToast('Ha ocurrido un error, intenta más tarde', 'success', 2500);
        }
      });
    }
  }

  back(){
    this.navCtrl.back({animated: true});
  }

}
