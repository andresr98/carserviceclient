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
            console.log(this.owner._links.owner.href);
          } else {
            console.log("No existe el Owner con el dni ingresado");
            this.gotoList();
          }
        }, err => {
          console.log("No existe el Owner con el dni ingresado");
          this.gotoList();
        })
      }
    });
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe( result => {
      console.log(result);
      this.gotoList();
    }, error => {
      console.log('Error al actualizar o eliminar el usuario');
    })
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
