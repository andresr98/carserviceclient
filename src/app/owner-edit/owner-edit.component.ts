import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service'

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  owner: any = {};
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private ownerService: OwnerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const idOwner = params['id']; 

      if (idOwner) {
        this.ownerService.getOwnerByDni(idOwner).subscribe(data => {
          if(data._embedded.owners[0]) {
            this.owner = data._embedded.owners[0];
            this.owner.href = this.owner._links.owner.href
          } else {
            console.log("No existe el Owner con el dni ingresado");
            this.gotoList();
          }
        }, err => {
          console.log("No se puede conectar con el API");
          this.gotoList();
        })
      }
    });
  }

  saveOwner(form: NgForm) {
    this.ownerService.saveOwner(form).subscribe( result => {
      console.log('Owner creado con éxito');
      this.gotoList();
    }, error => {
      console.log('Error al actualizar o eliminar el usuario');
    })
  }

  deleteOwner(href) {
    this.ownerService.deleteOwnerByHref(href).subscribe(result => {
      console.log('Owner eliminado con éxito');
      this.gotoList();
    }, err => {
      console.log('No se puede borrar el Owner');
    });
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
