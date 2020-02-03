import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-basic-list',
  templateUrl: 'basic-list.component.html',

})
export class BasicListComponent implements OnInit {

  loading: boolean;
  paginationProps: any;
  list: any[];

  constructor(private httpClient: HttpClient,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.httpClient.get('/api/list').subscribe((res: any) => {
      this.list = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }


  showModal() {

  }

  showEditModal(item) {

  }
}
