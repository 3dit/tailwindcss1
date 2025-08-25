import {
  Component,
  computed,
  Input,
  signal,
  SimpleChanges,
} from "@angular/core";
import { RecipeData } from "../recipes.service";
import { TestPipe } from "../test.pipe.";

@Component({
  selector: "app-recipe",
  standalone: true,
  imports: [TestPipe],
  templateUrl: "./recipe.component.html",
  styleUrl: "./recipe.component.css",
})
export class RecipeComponent {
  metaArray: { label: string; value: string }[] = [];
  @Input() recipe: RecipeData | null = null;

  metasSignal = signal(this.recipe);
  metasList = computed(() => this.metasSignal());

  ngOnInit() {
    console.log("## ngOnInit");
    if (this.recipe?.meta) {
      this.metaArray = [];
      for (const key in this.recipe.meta) {
        this.metaArray.push({ label: key, value: this.recipe.meta[key] });
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
}
