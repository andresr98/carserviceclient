import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners = [];
  selecteds = 0;
  indexOwners = new Map();

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAllOwners().subscribe(data => {
      this.owners = data._embedded.owners;

      for (const owner of this.owners) {
        owner.href = owner._links.owner.href;
        owner.checked = false;
      }
    },
      error => {
        console.log('No se puede traer los Owners');
      });
  }

  changeCheckBoxEvent(event, index) {
    if (event.checked === true) {
      this.selecteds++;
      this.indexOwners.set(index, index);
    } else {
      this.selecteds--;
      this.indexOwners.delete(index);
    }
  }

  deleteOwners() {
    this.indexOwners.forEach(key => {
      const owner = this.owners[key];

      this.ownerService.removeRelation(owner.dni);

      this.ownerService.deleteOwnerByHref(owner.href)
    });
  }
}
