import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

export interface EditableLink {
  title: string;
  href: string;
  id?: string;
}

@Component({
  selector: 'app-editable-link-group',
  templateUrl: 'editable-link-group.component.html',
  styleUrls: ['editable-link-group.component.less']
})
export class EditableLinkGroupComponent implements OnInit {

  @Input() links: EditableLink[];
  // @Input() linkElement: TemplateRef<void>;
  @Output() readonly onAdd = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }
}
