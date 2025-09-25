import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HighlightDirective } from 'src/app/directives/highlight.directive';

// This component is initial stub for ingredients list edit functionality.

@Component({
  selector: 'app-ingredients-editor',
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './ingredients-editor.component.html',
  styleUrl: './ingredients-editor.component.css'
})
export class IngredientsEditorComponent {
  @Input() ingredients: string[] | null = [];
  @Output() ingredientsChange = new EventEmitter<{name: string, index:number}>();
  @Output() discardChanges = new EventEmitter<void>();
  //@Output() addIngredientEvent = new EventEmitter<{name: string, index:number}>();
  
  addIngredient(newIngredient: string) {
    console.log('(ingredients-editor-compontent.ts) addIngredient called with', newIngredient);
    if (newIngredient && newIngredient.trim() && this.ingredients) {
      this.ingredients.push(newIngredient.trim());
    }
  }

  saveIngredients() {
    //this.addIngredientEvent.emit({name: '', index: -1});
  }

  editIngredient(index: number, updatedIngredient: string) 
  {
    console.log('editIngredient called with', updatedIngredient, index);
    this.ingredientsChange.emit({name: updatedIngredient, index});
  }

  commitIngredientEdit(index: number, name: string) {
    console.log('commitIngredientEdit called with', name, index);
    this.ingredientsChange.emit({name, index});
  }

}
