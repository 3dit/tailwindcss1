import {
    Component,
    computed,
    effect,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    signal,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { RecipeData } from "../services/recipes.service";
import { TestPipe } from "../test.pipe.";
import { RecipesApiService } from "../services/recipes-api.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipeDisplayModes } from "../recipes/recipes.component";
import { IngredientsEditorComponent } from "./ingredients-editor/ingredients-editor.component";
import { IngredientModalComponent } from "./ingredient-modal/ingredient-modal.component";
import { HighlightDirective } from "../directives/highlight.directive";

@Component({
    selector: "app-recipe",
    standalone: true,
    imports: [TestPipe, CommonModule, ReactiveFormsModule, IngredientsEditorComponent, IngredientModalComponent, IngredientModalComponent, HighlightDirective],
    templateUrl: "./recipe.component.html",
    styleUrl: "./recipe.component.css",
})
export class RecipeComponent {
    RecipeDisplayModes = RecipeDisplayModes;
    metaArray: { label: string; value: string }[] = [];
    @Input() recipe: RecipeData | null = null; 
    @Input() displayMode = signal(RecipeDisplayModes.View);
    @Output() OnNewRecipeCreated = new EventEmitter<Omit<RecipeData, "id">>();
    
    //using ViewChild for practice but it feels like this should just be a compontent property
    @ViewChild('newIngredient') newIngredientInput!: ElementRef<HTMLInputElement>;

    recipeForm: FormGroup;
    formSubmitted = false;
    saveSuccess = false;
    saveError = "";
    showModal = false;
    constructor(private fb: FormBuilder, private api: RecipesApiService) {
        this.recipeForm = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(3)]],
            description: ["", [Validators.required, Validators.minLength(5)]],
            prep: ["", [Validators.required]],
            cook: [""],
            serves: [""],
        });

        //effect() is something that is described to run only when a signal within it changes.
        //I think this might work by effect running initially, and then tracking which signals are accessed
        //so when one of those signals changes, it knows to run the effect again.
        //This is useful for reacting to changes in signals without needing to use ngOnChanges or other lifecycle hooks.
        //It can help keep code more declarative and reactive.
        effect(() => {
            console.log("EFFECT!");
            const mode = this.displayMode();
            if (mode === RecipeDisplayModes.Edit) {
                this.recipeForm.enable();
                //patchValue seems to be the mechansicm to populate a form from (a model's) values
                this.recipeForm.patchValue({
                    title: this.recipe!.title,
                    description: this.recipe!.description,
                    //prep: this.recipe!.meta["prep"],
                    //cook: this.recipe!.meta["cook"],
                    //serves: this.recipe!.meta["serves"],
                });
            } else {
                //this.recipeForm.disable();
            }
        });
    }

    ngOnInit() {
        if (this.recipe?.meta) {
            this.metaArray = [];
            for (const key in this.recipe.meta) {
                this.metaArray.push({
                    label: key,
                    value: this.recipe.meta[key],
                });
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes["recipe"] &&
            this.displayMode() === RecipeDisplayModes.View
        ) {
            this.metaArray = [];
            for (const key in changes["recipe"].currentValue.meta) {
                this.metaArray.push({
                    label: key,
                    value: changes["recipe"].currentValue.meta[key],
                });
            }
        } 
    }

    onSubmit() {
        this.formSubmitted = true;
        this.saveSuccess = false;
        this.saveError = "";
        if (this.recipeForm.invalid) {
            return;
        }
        // Prepare recipe object
        const formValue = this.recipeForm.value;

        const newRecipe: Omit<RecipeData, "id"> = {
            title: formValue.title,
            description: formValue.description,
            ingredients: [],
            steps: [],
            meta: {
                prep: formValue.prep,
                cook: formValue.cook,
                serves: formValue.serves,
            },
        };
        this.OnNewRecipeCreated.emit(newRecipe);
    }

    addIngredient(ingredient: string) {
        console.log('(recipe.component.ts) addIngredient called with', ingredient);
        this.recipe!.ingredients = [...(this.recipe!.ingredients), ingredient];
        //this.recipe! = { ...this.recipe! }; // Trigger change detection
    }

    saveIngredient() {
        console.log('saveIngredient called with', this.newIngredientInput.nativeElement.value);
        this.showModal = false;
    }

    lastEditIndex = -1;
    editIngredientSelected(data:{name:string, index:number}) {
        console.log('editIngredientSelected called with', data.name, data.index);
        this.newIngredientInput.nativeElement.value = data.name;
        this.lastEditIndex = data.index;
        this.showModal = true;
        setTimeout(() => {
            this.newIngredientInput.nativeElement.focus();
            //this.newIngredientInput.nativeElement.select();
        });
    }

    commitIngredientEdit() {
        if(this.lastEditIndex >=0 && this.recipe) {
            const newName = this.newIngredientInput.nativeElement.value;
            console.log('commitIngredientEdit committing', newName, 'at index', this.lastEditIndex);
            this.recipe.ingredients[this.lastEditIndex] = newName;
            this.recipe = { ...this.recipe };
        }
        this.showModal = false;
    }   

    isCreateMode() {
        return this.displayMode() === RecipeDisplayModes.Create;
    }

    isEditMode() {
        return this.displayMode() === RecipeDisplayModes.Edit;
    }

    isEditOrCreateMode() {
        return (
            this.displayMode() === RecipeDisplayModes.Edit ||
            this.displayMode() === RecipeDisplayModes.Create
        );
    }
}
