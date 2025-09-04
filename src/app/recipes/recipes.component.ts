import { Component, Injectable } from "@angular/core";
import { forkJoin } from "rxjs";
import { RecipesService, RecipeData } from "../services/recipes.service";
import { RecipeComponent } from "../recipe/recipe.component";
import { MountButtonDirective } from "../directives/my-test.directive";
import { HighlightDirective } from "../directives/highlight.directive";
import { RecipesApiService } from "../services/recipes-api.service";

@Component({
  selector: "app-recipes",
  standalone: true,
  imports: [RecipeComponent, MountButtonDirective, HighlightDirective],
  templateUrl: "./recipes.component.html",
  styleUrl: "./recipes.component.css",
})
export class RecipesComponent {
  recipeIndex: number = 1;
  recipes: RecipeData[] = [];
  selectedRecipe: RecipeData | null = null;

  testDataList: string[] = ["Cat", "Dog", "Wolf"];

  constructor(
    private recipesService: RecipesService,
    private recipesApiService: RecipesApiService
  ) {}

  getNextRecipe() {
    this.recipeIndex =
      ++this.recipeIndex > this.recipes.length - 1 ? 1 : this.recipeIndex;
    this.recipesApiService.getRecipe(this.recipeIndex).subscribe((response) => {
      this.selectedRecipe = response;
    });
  }

  getPreviousRecipe() {
    // this.recipeIndex--;
    // if(this.recipeIndex < 0) {
    //   this.recipeIndex = this.recipes.length - 1;
    // }
    // this.selectedRecipe = this.recipes[this.recipeIndex];
    console.log(this.recipes);
    this.recipeIndex =
      --this.recipeIndex < 1 ? this.recipes.length - 1 : this.recipeIndex;
    this.recipesApiService.getRecipe(this.recipeIndex).subscribe((response) => {
      this.selectedRecipe = response;
    });
  }

  doDirectiveButtonClick() {
    console.log("Directive button clicked!");
    this.recipesApiService.getRecipe(this.recipeIndex).subscribe((response) => {
      console.log("API Response:", response);
    });
  }

  ngOnInit() {
    // forkJoin({
    //   recipes: this.recipesApiService.getRecipesList(),
    //   selectedRecipe: this.recipesApiService.getRecipe(this.recipeIndex)
    // }).subscribe(({ recipes, selectedRecipe }) => {
    //   this.recipes = recipes;
    //   this.selectedRecipe = selectedRecipe;
    //   // Next step: do something after both API calls
    //   console.log('Both API calls completed:', { recipes, selectedRecipe });
    // });

    this.recipesApiService.getRecipesList().subscribe((recipes) => {
      this.recipes = recipes;
      this.recipeIndex = recipes.length > 0 ? recipes[0].id : 1;
      this.recipesApiService.getRecipe(this.recipeIndex).subscribe((recipe) => {
        this.selectedRecipe = recipe;
      });
    });
  }
}
