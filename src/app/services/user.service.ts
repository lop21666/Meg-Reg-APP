import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

const loginUrl = environment.loginUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data: object = null;
  datosUsuario;

  constructor( private http: HttpClient, private storage: Storage ) { }

  login<T>( usu, password){
    return new Promise (resolve => {
      this.http.get(`${loginUrl}login&usuario=${usu}&password=${password}`).subscribe(async (resp: any) => {
        if ( resp.status ){
          await this.datosLocalStorage( resp.usuario );
          resolve(true);
        }else{
          this.data = null;
          resolve(false);
        }
      });
    });
  }

  async datosLocalStorage( data: object){
    this.storage.create();
    this.data = data;
    await this.storage.set('datos', data);
  }

  async getPerfil<T>(){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_ajustes.php?request=get_perfil&usuario=${this.datosUsuario.codigo}`);
  }

  async editProfile<T>( nombre, mail, telefono){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_ajustes.php?request=set_perfil&codigo=${this.datosUsuario.codigo}&nombre=${nombre}&mail=${mail}&telefono=${telefono}`);
  }

  async getPassword<T>(){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_ajustes.php?request=get_pasword&usuario=${this.datosUsuario.codigo}`);
  }

  async setPassword<T>( usuario, password){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_ajustes.php?request=set_pasword&codigo=${this.datosUsuario.codigo}&usuario=${usuario}&password=${password}`);
  }

}
