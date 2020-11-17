import {NgModule} from '@angular/core';
import {BasicListComponent} from "./basic-list/basic-list.component";
import {CardListComponent} from "./card-list/card-list.component";
import {ListComponent} from "./list/list.component";
import {ProjectsComponent} from "./list/projects/projects.component";
import {ArticlesComponent} from "./list/articles/articles.component";
import {ApplicationsComponent} from "./list/applications/applications.component";
import {TableListComponent} from "./table-list/table-list.component";
import {SharedModule} from "../../shared/shared.module";
import {ListRoutingModule} from "./list-routing.module";
import {TableListDetailComponent} from "./table-list/table-list-detail.component";

@NgModule({
  imports: [SharedModule, ListRoutingModule],
  exports: [],
  declarations: [
    BasicListComponent,
    CardListComponent,
    ListComponent,
    ProjectsComponent,
    ArticlesComponent,
    ApplicationsComponent,
    TableListComponent,
    TableListDetailComponent
  ],
  providers: [],
})
export class ListModule {
}
