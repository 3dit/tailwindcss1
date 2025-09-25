import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

//Initial stub of simple modal, it would be better to use Angular Material Library for its modal,
//or possibly some other library, but this is just a simple example of how to make a modal component.

@Component({
  selector: 'app-ingredient-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-modal.component.html',
  styleUrl: './ingredient-modal.component.css'
})
export class IngredientModalComponent { 
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    console.log('IngredientModalComponent onClose called');
    this.close.emit();
  }

  ngOnChanges() {
    console.log('IngredientModalComponent show changed to', this.show);
  }

  ngOnInit() {
    console.log('IngredientModalComponent initialized with show =', this.show);
  }

  ngOnViewInit() {
    console.log('IngredientModalComponent view initialized');
  }

  ngOnContentInit() {
    console.log('IngredientModalComponent content initialized');
  }

  ngOnContentChecked() {
    console.log('IngredientModalComponent content checked');
  }
}
