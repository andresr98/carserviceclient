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
      this.owners = data._embedded.owners;
      console.log(this.owners);
    }, 
      error => {
        console.log('No me conecté a la API');
      });
  }

  ngOnInit() {
  }

}
