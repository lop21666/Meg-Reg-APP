import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CepredenacService {

  datosUsuario;

  constructor( private http: HttpClient, private storage: Storage ) { }

  async getTransitos<T>( desde, hasta, pais ){
    this.datosUsuario = await this.storage.get('datos');
    if(desde === null && hasta === null  && pais !== null){
      // eslint-disable-next-line max-len
      return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_transito.php?request=transitos&usuario=${this.datosUsuario.codigo}&pais=${pais}`);
  }else if(pais === null  && desde !== null && hasta !== null){
      // eslint-disable-next-line max-len
      return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_transito.php?request=transitos&usuario=${this.datosUsuario.codigo}&desde=${desde}&hasta=${hasta}`);
    }else if(pais !== null  && desde !== null && hasta !== null){
      // eslint-disable-next-line max-len
      return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_transito.php?request=transitos&usuario=${this.datosUsuario.codigo}&pais=${pais}&desde=${desde}&hasta=${hasta}`);
    }else{
      // eslint-disable-next-line max-len
      return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_transito.php?request=transitos&usuario=${this.datosUsuario.codigo}`);
    }
  }

  async getPaises<T>(){
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_util.php?request=paises`);
  }

  async getFases<T>(){
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_util.php?request=fases`);
  }

  async getActores<T>(){
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_util.php?request=actores`);
  }

  async getFronteras<T>(notificacion){
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_transito.php?request=fronteras&notificacion=${notificacion}`);
  }


  async getReferencias<T>( fase, actor, pais ){


    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    // eslint-disable-next-line max-len
    headers.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    if(fase !== null  && actor === null  && pais === null){
      // eslint-disable-next-line max-len
      return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_biblioteca.php?request=acciones&fase=${fase}`, {headers});
    }else if(fase !== null  && actor !== null  && pais === null){
      // eslint-disable-next-line max-len
      return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_biblioteca.php?request=acciones&fase=${fase}&actor=${actor}`, {headers});
    }else if(fase !== null  && actor === null  && pais !== null){
      // eslint-disable-next-line max-len
      return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_biblioteca.php?request=acciones&fase=${fase}&pais=${pais}`, {headers});
    }
  }


  async getDocumentos<T>(notificacion){
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_transito.php?request=documentos&notificacion=${notificacion}`);
  }

  async cambioSituacion<T>(notificacion, frontera, observaciones){
    this.datosUsuario = await this.storage.get('datos');
    // eslint-disable-next-line max-len
    return this.http.get<T>(`https://mecreg.cepredenac.app/ROOT/API/API_transito.php?request=situacion_frontera&frontera=${frontera}&notificacion=${notificacion}&observaciones=${observaciones}=${this.datosUsuario.codigo}`);
  }

}
