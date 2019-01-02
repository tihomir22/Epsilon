import { Component, OnInit, ViewChild, ElementRef, Input, Renderer } from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit {
  @Input('expandHeight') expandHeight;
  @Input('expanded') expanded;
  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
 
  
 

  constructor(public renderer: Renderer) { }

  ngOnInit() {
  
  }

  ngAfterViewInit(){
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');   
}

}
