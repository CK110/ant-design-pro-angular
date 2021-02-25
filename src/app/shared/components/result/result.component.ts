import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';

export const IconMap = {
  'success': 'check-circle',
  'error': 'close-circle',
  'info': 'exclamation-circle',
  'warning': 'warning',
};

export const ExceptionMap = {
  '404': '404',
  '500': '500',
  '403': '403',
};

export type ExceptionStatusType = keyof typeof ExceptionMap;
export type ResultStatusType = ExceptionStatusType | keyof typeof IconMap;

@Component({
  selector: 'pro-result',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.less'],

  encapsulation: ViewEncapsulation.None,
  exportAs: 'proResult',
  preserveWhitespaces: false
})
export class ResultComponent implements OnInit, AfterViewInit {

  @Input() title: string | TemplateRef<void>;
  @Input() subTitle: string | TemplateRef<void>;
  @Input() status: ResultStatusType;
  @Input() icon: string | TemplateRef<void>;
  @Input() extra: TemplateRef<void>;

  @ViewChild('contentTemplate', {static: true})
  private contentTemplate: ElementRef;

  exceptionStatus = Object.keys(ExceptionMap);
  iconStatus=Object.keys(IconMap);
  iconMap = IconMap;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    console.log(this.contentTemplate);

  }

  ngAfterViewInit(): void {
    this.checkContent();
  }

  checkContent() {
    if (isNil(this.contentTemplate.nativeElement)) {
      this.renderer.setStyle(this.contentTemplate.nativeElement, 'display', 'none');
    } else {
      this.renderer.removeStyle(this.contentTemplate.nativeElement, 'display');
    }
  }
}
