import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TableListComponent} from "./table-list/table-list.component";
import {BasicListComponent} from "./basic-list/basic-list.component";
import {CardListComponent} from "./card-list/card-list.component";
import {ListComponent} from "./list/list.component";
import {ArticlesComponent} from "./list/articles/articles.component";
import {ProjectsComponent} from "./list/projects/projects.component";
import {ApplicationsComponent} from "./list/applications/applications.component";

const routes: Routes = [
  {path: '', redirectTo: 'table-list', pathMatch: 'full'},
  {path: 'table-list', component: TableListComponent, data: {name: '查询表格'}},
  {path: 'basic-list', component: BasicListComponent, data: {name: '标准列表'}},
  {path: 'card-list', component: CardListComponent, data: {name: '卡片列表'},},
  {
    path: 'search', component: ListComponent, data: {name: '搜索列表'},
    children: [
      {path: '', redirectTo: 'articles', pathMatch: 'full'},
      {
        path: 'articles',
        component: ArticlesComponent,
        data: {name: '搜索列表(文章)', guard: {role: ['user1'], ability: [10, 'USER-EDIT'], mode: 'allOf'}}
      },
      {path: 'projects', component: ProjectsComponent, data: {name: '搜索列表(项目)'}},
      {path: 'applications', component: ApplicationsComponent, data: {name: '搜索列表(应用)'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
