import { Component, effect, Injectable, signal, WritableSignal } from "@angular/core";
import { forkJoin } from "rxjs";
import { RecipesService, RecipeData } from "../services/recipes.service";
import { RecipeComponent } from "../recipe/recipe.component";
import { RecipesApiService } from "../services/recipes-api.service";

export enum RecipeDisplayModes {
    View = 0,
    Edit = 1,
    Create = 2,
}
@Component({
    selector: "app-recipes",
    standalone: true,
    imports: [RecipeComponent],
    templateUrl: "./recipes.component.html",
    styleUrl: "./recipes.component.css",
})
export class RecipesComponent {
    RecipeDisplayModes = RecipeDisplayModes; //Interesting!
    recipeIndex: number = 1;
    recipes: RecipeData[] = [];
    selectedRecipe: RecipeData | null = null;
    recipeDisplayMode = signal(RecipeDisplayModes.View);

    testDataList: string[] = ["Cat", "Dog", "Wolf"];

    theSignal: WritableSignal<string> | null = null;

    constructor(
        private recipesService: RecipesService,
        private recipesApiService: RecipesApiService
    ) { 
      this.theSignal = this.recipesApiService.getSomeStateSignal();
    }

    stateList = ["State 1", "State 2", "change state"];
    stateIndex = 0;
    performTest() {
      this.stateIndex = (this.stateIndex + 1) % this.stateList.length;
      //following should fire off the effect in RecipesApiService
      console.log('setting theSignal to ', this.stateList[this.stateIndex]);
      this.theSignal && this.theSignal.set(this.stateList[this.stateIndex]);
    }

    getNextRecipe() {
        this.recipeIndex++;
        if (this.recipeIndex > this.recipes.length) {
            this.recipeIndex = 1;
        }
        this.recipesApiService
            .getRecipe(this.recipes[this.recipeIndex - 1].id)
            .subscribe((response) => {
                console.log(this.selectedRecipe);
                this.selectedRecipe = response;
            });
    }

    getPreviousRecipe() {
        this.recipeIndex--;
        if (this.recipeIndex < 1) {
            this.recipeIndex = this.recipes.length;
        }
        this.recipesApiService
            .getRecipe(this.recipes[this.recipeIndex - 1].id)
            .subscribe((response) => {
                console.log(this.selectedRecipe);
                this.selectedRecipe = response;
            });
    }

    beginCreateRecipe() {
        this.recipeDisplayMode.set(RecipeDisplayModes.Create);
        this.selectedRecipe = null;
    }

    editRecipe() {
        this.recipeDisplayMode.set(
            this.recipeDisplayMode() === RecipeDisplayModes.Edit
                ? RecipeDisplayModes.View
                : RecipeDisplayModes.Edit
        );
        console.log(`Edit Recipes with selectedRecipe:`, this.selectedRecipe);
    }

    uncreate() {
        console.log("uncreated");
        this.recipeDisplayMode.set(RecipeDisplayModes.View);
        this.selectedRecipe = null;
    }

    onRecipeCreated(recipe: Omit<RecipeData, "id">) {
        console.log("onRecipeCreated called in recipes.component.ts:", recipe);
        recipe.meta = { pred: "5", cook: "10", serves: "2" };
        recipe.steps = ["Step 1", "Step 2", "Step 3"];
        recipe.ingredients = ["Ingredient 1", "Ingredient 2", "Ingredient 3"];
        this.recipesApiService.saveRecipe(recipe).subscribe((savedRecipe) => {
            if (savedRecipe.status === "Recipe saved") {
                this.recipesApiService
                    .getRecipe(savedRecipe.id)
                    .subscribe((newRecipe) => {
                        this.recipes.push(newRecipe);
                        this.recipeIndex = this.recipes.length;
                        this.selectedRecipe = newRecipe;
                        this.recipeDisplayMode.set(RecipeDisplayModes.View);
                    });
            } else {
                alert("Error saving recipe: " + savedRecipe.status);
            }
        });
    }

    // writeNewRecipe() {
    //   this.recipesApiService.newRecipe().subscribe((response) => {
    //     console.log("New Recipe Created:", response);
    //   });
    // }

    doDirectiveButtonClick() {
        console.log("Directive button clicked!");
        // this.recipesApiService.getRecipe(this.recipeIndex).subscribe((response) => {
        //   console.log("API Response:", response);
        // });
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
            this.recipesApiService
                .getRecipe(this.recipeIndex)
                .subscribe((recipe) => {
                    console.log(recipe);
                    this.selectedRecipe = recipe;
                });
        });
    }
}
