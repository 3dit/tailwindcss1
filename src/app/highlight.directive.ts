// highlight.directive.ts
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef, private r: Renderer2) {}

  @HostListener('mouseenter') onEnter() {
    console.log('Highlight Mouse Enter');
    this.r.setStyle(this.el.nativeElement, 'background', 'yellow');
  }
  @HostListener('mouseleave') onLeave() {
    this.r.removeStyle(this.el.nativeElement, 'background');
  }
  @HostListener('click') onClick() {
    console.log('Highlight Click');
  }
}
