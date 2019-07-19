import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {RoleListComponent} from "./role-list/role-list.component";
import {PermissionListComponent} from "./permission-list/permission-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'other', pathMatch: 'full'},
  {path: 'user-list', component: UserListComponent, data: {name: '用户列表'}},
  {path: 'role-list', component: RoleListComponent, data: {name: '角色列表'}},
  {path: 'permission-list', component: PermissionListComponent, data: {name: '权限列表'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherRoutingModule {
}
