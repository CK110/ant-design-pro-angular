import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {Settings} from '../core/default-settings';
import {NzMessageService} from 'ng-zorro-antd';
import {SettingsService} from '../core/settings.service';

interface SettingItemProps {
  title: string;
  action: TemplateRef<void>[];
  disabled?: boolean;
  disabledReason?: string;
}

type MergerSettingsType<T> = Partial<T> & {
  primaryColor?: string;
  colorWeak?: boolean;
};

@Component({
  selector: 'pro-setting-drawer',
  templateUrl: 'setting-drawer.component.html',
  styleUrls: ['setting-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'proSettingDrawer',
  preserveWhitespaces: false
})
export class SettingDrawerComponent implements OnInit {

  @Input() settings: MergerSettingsType<Settings>;
  @Output() onSettingChange: EventEmitter<MergerSettingsType<Settings>> = new EventEmitter();
  @Output() onCollapseChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('renderItemTemplate', {static: true}) public renderItemTemplate: TemplateRef<void>;
  @ViewChild('contentWidthActionTemplate', {static: true}) public contentWidthActionTemplate: TemplateRef<void>;
  @ViewChild('fixedHeaderActionTemplate', {static: true}) public fixedHeaderActionTemplate: TemplateRef<void>;
  @ViewChild('hideHeaderActionTemplate', {static: true}) public hideHeaderActionTemplate: TemplateRef<void>;
  @ViewChild('fixedSidebarActionTemplate', {static: true}) public fixedSidebarActionTemplate: TemplateRef<void>;
  @ViewChild('colorWeakActionTemplate', {static: true}) public colorWeakActionTemplate: TemplateRef<void>;

  collapse = false;
  pageStyleList: any[];
  navigationModeList: any[];
  layoutSetting: SettingItemProps[];
  otherSettings: SettingItemProps[];

  constructor(private zone: NgZone,
              private cdr: ChangeDetectorRef,
              private settingsService: SettingsService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.pageStyleList = [
      {
        key: 'dark',
        url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
        title: '暗色菜单风格'
      },
      {
        key: 'light',
        url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
        title: '亮色菜单风格'
      },
    ];

    this.navigationModeList = [
      {
        key: 'sidemenu',
        url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
        title: '侧边菜单布局'
      },
      {
        key: 'topmenu',
        url: 'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
        title: '顶部菜单布局'
      },
    ];

    this.layoutSetting = [
      {
        title: '内容区域宽度',
        action: [this.contentWidthActionTemplate]
      },
      {
        title: '固定 Header',
        action: [this.fixedHeaderActionTemplate]
      },
      {
        title: '下滑时隐藏 Header',
        disabled: !this.settings.fixedHeader,
        disabledReason: '固定 Header 时可配置',
        action: [this.hideHeaderActionTemplate]
      },
      {
        title: '固定侧边菜单',
        disabled: this.settings.layout === 'topmenu',
        disabledReason: '侧边菜单布局时可配置',
        action: [this.fixedSidebarActionTemplate]
      },
    ];

    this.otherSettings = [
      {
        title: '色弱模式',
        action: [this.colorWeakActionTemplate]
      }
    ];
  }

  changeSetting(key: string, value: string | boolean) {
    this.settings[key] = value;
    if (key === 'layout') {
      this.settings.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
      this.layoutSetting[3].disabled = value === 'topmenu' ? true : false;
    }
    if (key === 'fixedHeader') {
      if (value) {
        this.layoutSetting[2].disabled = false;
      } else {
        this.settings.autoHideHeader = false;
        this.layoutSetting[2].disabled = true;
      }
    }
    this.settingsService.setSettings(key, value);
    this.onSettingChange.emit(this.settings);
  }

  togglerContent() {
    this.collapse = !this.collapse;
    this.onCollapseChange.emit(this.collapse);
  }
}
