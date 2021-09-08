import {Injectable} from '@angular/core';
import {ReuseItem} from "./reuse-tab.interface";

class Node<T> {
  element: T;
  next: Node<T> | null;

  constructor(element: T, next: Node<T> | null = null) {
    this.element = element;
    this.next = next;
  }
}

/**
 * 路径链表实现LRU
 */
@Injectable({
  providedIn: 'root'
})
export class ReuseTabHistoryService {

  private length: number = 0
  private head: Node<ReuseItem> | null = null

  constructor() {
  }

  public findNextActive(value: ReuseItem): ReuseItem{
    // console.log(this.toString());
    if(this.keyEqual(this.head.element,value)){
      return this.head.next.element;
    }else{
      return this.head.element;
    }
    return null;
  }

  public new(value: ReuseItem): void {
    // console.log(`======${value.url}======`);
    // console.log(this.toString());
    this.remove(value);
    // console.log(this.toString());
    this.insertToHead(value);
    // console.log(this.toString());
  }

  public close(value: ReuseItem): void {
    // console.log(`======${value.url}======`);
    // console.log(this.toString());
    this.remove(value);
    // console.log(this.toString());
  }

  private insertToHead(value: ReuseItem): void {
    if (this.head != null && this.keyEqual(this.head.element, value)) {
      return;
    } else {
      const newNode = new Node(value);
      if (this.head !== null) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        this.head = newNode;
      }
      this.length++;
    }
  }

  private findPreValue(value: ReuseItem): any {
    let currentNode: any = this.head;
    if (currentNode == null) {
      return null;
    }
    while (currentNode.next !== null && !this.keyEqual(currentNode.next.element, value)) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  private remove(value: ReuseItem): boolean {
    const preNode = this.findPreValue(value)
    if (preNode !== null && preNode.next !== null) {
      preNode.next = preNode.next.next
      return true
    } else {
      return false
    }
  }

  public toString(): string {
    let currentNode: Node<ReuseItem> = this.head
    let str = ''
    while (currentNode) {
      str += currentNode.element.url
      if (currentNode.next) {
        str = str + '->'
      }
      currentNode = currentNode.next
    }
    return str
  }

  public size(): any {
    return this.length
  }

  private keyEqual(element1: ReuseItem, element2: ReuseItem) {
    return (element1.url == element2.url) && (JSON.stringify(element1.queryParams) === JSON.stringify(element1.queryParams))
  }

}

