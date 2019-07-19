import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: 'card-list.component.html',
  styleUrls:['card-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
