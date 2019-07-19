import {NgModule} from '@angular/core';
import {SharedModule} from "@shared/shared.module";
import {UserListComponent} from "./user-list/user-list.component";
import {RoleListComponent} from "./role-list/role-list.component";
import {PermissionListComponent} from "./permission-list/permission-list.component";
import {OtherRoutingModule} from "./other-routing.module";

@NgModule({
  imports: [SharedModule, OtherRoutingModule],
  exports: [],
  declarations: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent
  ]
})
export class OtherModule {
}
