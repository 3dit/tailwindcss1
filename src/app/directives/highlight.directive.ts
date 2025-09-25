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
    this.r.setStyle(this.el.nativeElement, 'color', '#002366');
    this.r.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    this.r.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }
  @HostListener('mouseleave') onLeave() {
    this.r.removeStyle(this.el.nativeElement, 'color');
    this.r.removeStyle(this.el.nativeElement, 'font-weight');
    this.r.removeStyle(this.el.nativeElement, 'cursor');
  }
  @HostListener('click') onClick() {
    console.log('Highlight Click');
  }
}
