import { Component, Injectable } from '@angular/core';
import { RecipesService, RecipeData } from '../recipes.service';
import { RecipeComponent } from "../recipe/recipe.component";
import { MountButtonDirective } from '../my-test.directive';
import { ListDirective } from '../list-directive.directive';
import { HighlightDirective } from '../highlight.directive';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeComponent, MountButtonDirective, ListDirective, HighlightDirective],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})

export class RecipesComponent {
  recipeIndex : number = 0;
  recipes: RecipeData[] = [];
  selectedRecipe: RecipeData | null = null;
  
  testDataList: string[] = ['Cat', 'Dog', 'Wolf'];

  constructor(private recipesService: RecipesService) {
    this.recipes = this.recipesService.getRecipes();
    this.selectedRecipe = this.recipes[this.recipeIndex];
  }

  getNextRecipe() {
    this.recipeIndex++;
    if(this.recipeIndex >= this.recipes.length) {
      this.recipeIndex = 0;
    }
    this.selectedRecipe = this.recipes[this.recipeIndex];
  }
  
  getPreviousRecipe() {
    this.recipeIndex--;
    if(this.recipeIndex < 0) {
      this.recipeIndex = this.recipes.length - 1;
    }
    this.selectedRecipe = this.recipes[this.recipeIndex];
  }

  doDirectiveButtonClick() {
    console.log('Directive button clicked!');
  }
}
