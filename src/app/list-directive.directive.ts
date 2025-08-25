// src/app/list.directive.ts
import {
  Directive, Input, TemplateRef, ViewContainerRef,
  Renderer2, OnChanges, SimpleChanges
} from '@angular/core';

type Ctx<T> = { $implicit: T; index: number };

@Directive({
  selector: '[appList]',
  standalone: true
})
export class ListDirective<T> implements OnChanges {
  @Input('appListOf') items: T[] = [];
  @Input('appListHeader') headerText = 'Items';

  private wrapper!: HTMLElement;
  private headerEl!: HTMLElement;

  constructor(
    private tpl: TemplateRef<Ctx<T>>,
    private vcr: ViewContainerRef,
    private r: Renderer2
  ) {}

  ngOnChanges(_: SimpleChanges): void {
    // Rebuild the view each time inputs change (simple demo)
    this.vcr.clear();

    // Create a wrapper (code-driven)
    this.wrapper = this.r.createElement('div');
    this.r.setStyle(this.wrapper, 'border', '1px solid #e5e7eb');
    this.r.setStyle(this.wrapper, 'borderRadius', '0.5rem');
    this.r.setStyle(this.wrapper, 'padding', '0.75rem');

    // Create a header (code-driven)
    this.headerEl = this.r.createElement('div');
    this.r.setStyle(this.headerEl, 'fontWeight', '600');
    this.r.setStyle(this.headerEl, 'marginBottom', '0.5rem');
    this.r.setProperty(this.headerEl, 'textContent', this.headerText);
    this.r.appendChild(this.wrapper, this.headerEl);

    // Insert the wrapper into the container
    // (We’ll anchor it by creating an embedded empty view and then inserting the node)
    const anchor = this.vcr.createEmbeddedView(this.tpl, {} as any); // anchor
    // Insert wrapper before the first node of the anchor view
    const nativeAnchor = anchor.rootNodes[0] as Node | undefined;
    if (nativeAnchor?.parentNode) {
      nativeAnchor.parentNode.insertBefore(this.wrapper, nativeAnchor);
    } else {
      // Fallback: if no native node, just append to the container's element (not typical)
      this.vcr.element?.nativeElement?.appendChild(this.wrapper);
    }

    // For each item, stamp the user template inside the wrapper
    this.items.forEach((item, index) => {
      const view = this.tpl.createEmbeddedView({ $implicit: item, index });
      view.detectChanges();
      view.rootNodes.forEach(node => this.r.appendChild(this.wrapper, node));
    });
  }
}
