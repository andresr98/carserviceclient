import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service'

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners = [];

  constructor(private ownerService: OwnerService) { 
    this.ownerService.getAllOwners().subscribe(data => {
      console.log(data);
      this.owners = data._embedded.owners;
    }, 
      error => {
        console.log('No se puede traer los Owners');
      });
  }

  ngOnInit() {
  }

}
