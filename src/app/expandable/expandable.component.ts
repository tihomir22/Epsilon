import { Component, OnInit, ViewChild, ElementRef, Input, Renderer } from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expandHeight') expandHeight;
  @Input('expanded') expanded;
  
 

  constructor(public renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');   
  }

  ngAfterViewInit(){
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');   
}

}
