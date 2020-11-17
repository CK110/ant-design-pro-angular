import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableListData, TableListItem, TableListPagination} from "./data";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table-list',
  templateUrl: 'table-list.component.html',
  styleUrls: ['table-list.component.less']
})
export class TableListComponent implements OnInit {

  form: any = {
    name: '',
    status: '',
    number: '',
    date: '',
    status3: '',
    status4: '',
  };
  expandForm: boolean = false;

  data: TableListItem[];
  page: Partial<TableListPagination> = {
    pageSize: 10,
    current: 1
  };
  status = ['关闭', '运行中', '已上线', '异常'];
  statusFilters = [
    {text: this.status[0], value: '0'},
    {text: this.status[1], value: '1'},
    {text: this.status[2], value: '2'},
    {text: this.status[3], value: '3'}
  ];
  selectedRows: any[] = [];


  constructor(private httpClient: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadata();
  }

  loadata(reset: boolean = false) {
    if (reset) {
      this.page.current = 1;
    }
    const url = `/api/rule?currentPage=${this.page.current}&pageSize=${this.page.pageSize}`
    this.httpClient.get(url).subscribe((tableListData: TableListData) => {
      this.data = tableListData.list;
      this.page = tableListData.pagination
    })
  }

  handleModalVisible(param: boolean) {

  }

  handleSearch() {

  }

  handleFormReset() {

  }

  toggleForm() {
    this.expandForm = !this.expandForm;
  }


  // table
  currentPageDataChange(event: any) {

  }

  checkAll(event: any) {

  }


  statusFiltersChange(event: any, status: any) {

  }

  toDetail(data) {
    this.router.navigate(['/list/table-list-detail'], {
      queryParams: {name: data.name}
    });
  }

}
