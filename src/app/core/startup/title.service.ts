import {Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Injectable()
export class TitleService {

  private _prefix = '';
  private _suffix = '';
  private _separator = ' - ';
  private _reverse = false;


  constructor(private title: Title,) {

  }

  setTitle(title?: string | string[]) {
    if (!title) {
      title = 'No title';
    }
    if (title && !Array.isArray(title)) {
      title = [title];
    }

    let newTitles = [];
    if (this._prefix) {
      newTitles.push(this._prefix);
    }
    newTitles.push(...(title as string[]));
    if (this._suffix) {
      newTitles.push(this._suffix);
    }
    if (this._reverse) {
      newTitles = newTitles.reverse();
    }
    this.title.setTitle(newTitles.join(this._separator));
  }


}
