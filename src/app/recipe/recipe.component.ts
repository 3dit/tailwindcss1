import {
    Component,
    computed,
    EventEmitter,
    Input,
    Output,
    signal,
    SimpleChanges,
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

@Component({
    selector: "app-recipe",
    standalone: true,
    imports: [TestPipe, CommonModule, ReactiveFormsModule],
    templateUrl: "./recipe.component.html",
    styleUrl: "./recipe.component.css",
})
export class RecipeComponent {
    RecipeDisplayModes = RecipeDisplayModes;
    metaArray: { label: string; value: string }[] = [];
    @Input() recipe: RecipeData | null = null;
    @Input() displayMode = signal(RecipeDisplayModes.View);
    @Output() OnNewRecipeCreated = new EventEmitter<Omit<RecipeData, "id">>();

    recipeForm: FormGroup;
    formSubmitted = false;
    saveSuccess = false;
    saveError = "";

    constructor(private fb: FormBuilder, private api: RecipesApiService) {
        this.recipeForm = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(3)]],
            description: ["", [Validators.required, Validators.minLength(5)]],
            prep: ["", [Validators.required]],
            cook: [""],
            serves: [""],
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
        if (changes["recipe"]) {
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
}
