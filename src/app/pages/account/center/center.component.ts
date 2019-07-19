import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {zip} from "rxjs";
import {CurrentUser} from "./_mock";

@Component({
  selector: 'app-center',
  templateUrl: 'center.component.html',
  styleUrls: ['center.component.less']
})
export class CenterComponent implements OnInit {

  @ViewChild('tagInput', { static: false })
  private tagInput: ElementRef;
  tagValue = '';
  inputVisible:boolean = false;

  dataLoading: boolean = true;

  currentUser: CurrentUser;


  constructor(private httpClient: HttpClient,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.httpClient.get('/api/currentUser').subscribe((currentUser:any)=>{
      console.log(currentUser);
      this.dataLoading = false;
      this.currentUser = currentUser;
    })
  }

  tagShowIpt() {
    this.inputVisible = true;
    this.cdr.detectChanges();
    (this.tagInput.nativeElement as HTMLInputElement).focus();
  }

  tagBlur() {
    const { currentUser, cdr, tagValue } = this;
    if (tagValue && currentUser.tags.filter(tag => tag.label === tagValue).length === 0) {
      currentUser.tags.push({ key: '6' ,label: tagValue });
    }
    this.tagValue = '';
    this.inputVisible = false;
    cdr.detectChanges();
  }

  tagEnter(e: KeyboardEvent) {
    if (e.keyCode === 13) this.tagBlur();
  }
}
