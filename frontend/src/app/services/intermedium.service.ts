import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IntermediumService {
  
  mensaje='';
  tipo_user='';
  dependencia='';
  constructor(private authService:AuthService,
              private router:Router,
              private ususer:UserService
              ) { }

  login(user:any){
    
    this.authService.login(user)
    .subscribe(
      res=>{
        localStorage.setItem('token',res.token);
        localStorage.setItem('roles',res.roles);
        localStorage.setItem('id', res.id);
        this.tipo_user=res.roles;
        this.dependencia=res.dependencia;
        if(localStorage.getItem('roles')==='USER')
        {
          this.router.navigate(['/reservas'])
        }
        else if(localStorage.getItem('roles')==='ADMIN')
        {
          this.router.navigate(['/admin'])
        }
        else
          this.router.navigate(['/registeruser'])
      },
      err=>{console.log(err),
        this.mensaje="Error con el usuario o la clave"}
    );
  }

  esUser(){
    if(localStorage.getItem('roles')==='USER')
    {
      return true;
    }
    else return false;
  }

  esAdmin(){
    if(localStorage.getItem('roles')==='ADMIN')
    {
      return true;
    }
    else return false;
  }

  esSuperAdmin(){
    if(localStorage.getItem('roles')==="SUPERA")
    {
      return true;
    }
    else return false;
  }
  getMensaje():string{
    return this.mensaje
  }
  getid():String{
    let id = localStorage.getItem('id')
    if (id) {
      return id
    }else{
      return ""
    }
  }


}
