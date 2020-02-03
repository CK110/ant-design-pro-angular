import {Component, OnInit} from '@angular/core';
import {ACLService} from '@delon/acl';

@Component({
  selector: 'app-permission-list',
  templateUrl: 'permission-list.component.html'
})
export class PermissionListComponent implements OnInit {
  constructor(private aclService: ACLService) {
  }

  ngOnInit() {
  }

  addRight() {
    this.aclService.setAbility([1, 2])
  }

  clearRight(){
    this.aclService.setAbility([]);
  }
}
