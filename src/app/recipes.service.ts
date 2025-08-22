import { Injectable } from '@angular/core';

export interface RecipeData {
  id: number;
  title: string;
  description: string;
  meta: {
    [key: string]: string; // allows extra fields like difficulty/heat
  };
  ingredients: string[];
  steps: string[];
}


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }

  getRecipes() : RecipeData[] {
    return RECIPES;
  }

}

const RECIPES: RecipeData[] = [
  {
    id: 1,
    title: "Garlic Lemon Pasta",
    description: "A quick weeknight pasta brightened with lemon zest and parsley.",
    meta: { prep: "8 mins", cook: "10 mins", serves: "2" },
    ingredients: [
      "6 oz spaghetti",
      "2 tbsp olive oil",
      "2 cloves garlic, thinly sliced",
      "1 lemon (zest & juice)",
      "2 tbsp Parmesan",
      "Salt & pepper",
      "Chopped parsley"
    ],
    steps: [
      "Cook spaghetti until al dente; reserve pasta water.",
      "Sauté garlic in olive oil until fragrant.",
      "Toss pasta with garlic oil, lemon juice, zest, and Parmesan.",
      "Adjust with pasta water; garnish with parsley."
    ]
  },
  {
    id: 2,
    title: "One-Pot Weeknight Chili",
    description: "Hearty chili with beans, tomatoes, and mild spices.",
    meta: { prep: "15 mins", cook: "40 mins", serves: "4–6", heat: "Medium" },
    ingredients: [
      "1 lb ground beef",
      "1 onion, diced",
      "1 red bell pepper, diced",
      "2 cloves garlic, minced",
      "2 tbsp chili powder",
      "1 tsp cumin",
      "1 can diced tomatoes",
      "1 can tomato sauce",
      "1 can kidney beans",
      "1 cup broth",
      "Salt & pepper"
    ],
    steps: [
      "Sauté onion and pepper in oil until soft.",
      "Add garlic and beef; cook until browned.",
      "Stir in spices, then add tomatoes, sauce, beans, and broth.",
      "Simmer 20–25 minutes; season to taste."
    ]
  },
  {
    id: 3,
    title: "Vegetable Lasagna",
    description: "Layered zucchini, eggplant, mushrooms, tomato sauce, and béchamel.",
    meta: { prep: "35 mins", cook: "1 hr 10 mins", serves: "8–10", difficulty: "Moderate" },
    ingredients: [
      "2 zucchini",
      "1 eggplant",
      "2 bell peppers",
      "8 oz mushrooms",
      "1 onion",
      "1 can crushed tomatoes",
      "12 lasagna noodles",
      "3 cups milk",
      "4 tbsp butter",
      "4 tbsp flour",
      "2 cups mozzarella",
      "1 cup Parmesan",
      "Fresh basil"
    ],
    steps: [
      "Roast vegetables until tender.",
      "Make tomato sauce with onion, garlic, and tomatoes.",
      "Prepare béchamel with butter, flour, and milk.",
      "Layer noodles, sauces, vegetables, and cheese in a pan.",
      "Bake covered, then uncovered until golden and bubbling."
    ]
  },
  {
    id: 4,
    title: "Classic Pancakes",
    description: "Fluffy breakfast pancakes made from scratch.",
    meta: { prep: "10 mins", cook: "15 mins", serves: "4" },
    ingredients: [
      "1 cup flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1 egg",
      "1 cup milk",
      "2 tbsp melted butter",
      "Pinch of salt"
    ],
    steps: [
      "Mix dry ingredients together.",
      "Whisk wet ingredients separately.",
      "Combine wet and dry until just mixed.",
      "Cook on greased skillet until bubbles form; flip and finish."
    ]
  },
  {
    id: 5,
    title: "Greek Salad",
    description: "Refreshing salad with cucumber, tomato, olives, and feta.",
    meta: { prep: "12 mins", cook: "0 mins", serves: "4" },
    ingredients: [
      "2 cucumbers",
      "3 tomatoes",
      "1 red onion",
      "1/2 cup Kalamata olives",
      "1/2 cup feta cheese",
      "3 tbsp olive oil",
      "1 tbsp red wine vinegar",
      "Oregano, salt, pepper"
    ],
    steps: [
      "Chop vegetables into bite-size pieces.",
      "Combine in a bowl with olives and feta.",
      "Whisk dressing ingredients; toss with salad.",
      "Serve chilled."
    ]
  },
  {
    id: 6,
    title: "Shakshuka",
    description: "Eggs poached in a spiced tomato and pepper sauce.",
    meta: { prep: "10 mins", cook: "25 mins", serves: "3–4" },
    ingredients: [
      "2 tbsp olive oil",
      "1 onion, diced",
      "1 red bell pepper, diced",
      "3 cloves garlic",
      "2 tsp paprika",
      "1 tsp cumin",
      "1/4 tsp chili flakes",
      "1 can crushed tomatoes",
      "4–6 eggs",
      "Parsley for garnish"
    ],
    steps: [
      "Sauté onion and pepper until soft.",
      "Add garlic and spices; cook until fragrant.",
      "Stir in tomatoes; simmer 10 minutes.",
      "Make wells; crack eggs into sauce.",
      "Cover and cook until eggs set to preference."
    ]
  },
  {
    id: 7,
    title: "Beef Stir Fry",
    description: "Quick Asian-style stir fry with beef and vegetables.",
    meta: { prep: "20 mins", cook: "10 mins", serves: "4" },
    ingredients: [
      "1 lb beef sirloin, thinly sliced",
      "2 cups broccoli florets",
      "1 carrot, julienned",
      "1 bell pepper, sliced",
      "2 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp cornstarch",
      "2 cloves garlic",
      "2 tbsp vegetable oil"
    ],
    steps: [
      "Marinate beef with soy, oyster sauce, and cornstarch.",
      "Heat oil, stir fry beef until browned; remove.",
      "Add vegetables and garlic; stir fry until tender-crisp.",
      "Return beef; toss together and serve."
    ]
  },
  {
    id: 8,
    title: "Banana Bread",
    description: "Moist and sweet quick bread with ripe bananas.",
    meta: { prep: "15 mins", cook: "1 hr", serves: "8" },
    ingredients: [
      "3 ripe bananas",
      "1/3 cup melted butter",
      "1/2 cup sugar",
      "1 egg",
      "1 tsp vanilla",
      "1 tsp baking soda",
      "Pinch of salt",
      "1.5 cups flour"
    ],
    steps: [
      "Mash bananas and mix with butter, sugar, egg, and vanilla.",
      "Add dry ingredients and stir until combined.",
      "Pour into greased loaf pan.",
      "Bake at 350°F (175°C) for 1 hour."
    ]
  },
  {
    id: 9,
    title: "Caesar Salad",
    description: "Crisp romaine lettuce with creamy dressing and croutons.",
    meta: { prep: "15 mins", cook: "0 mins", serves: "4" },
    ingredients: [
      "1 head romaine lettuce",
      "1/2 cup croutons",
      "1/4 cup Parmesan",
      "1/3 cup Caesar dressing",
      "Lemon wedge"
    ],
    steps: [
      "Wash and chop lettuce.",
      "Toss with dressing until coated.",
      "Top with croutons, Parmesan, and a squeeze of lemon."
    ]
  },
  {
    id: 10,
    title: "Chicken Curry",
    description: "Mild spiced curry with tender chicken and coconut milk.",
    meta: { prep: "20 mins", cook: "40 mins", serves: "4" },
    ingredients: [
      "1 lb chicken thighs",
      "2 tbsp curry paste",
      "1 onion, diced",
      "2 cloves garlic",
      "1 can coconut milk",
      "1 cup chicken stock",
      "1 tbsp oil",
      "Fresh cilantro"
    ],
    steps: [
      "Sauté onion and garlic until fragrant.",
      "Stir in curry paste; cook briefly.",
      "Add chicken and brown.",
      "Pour in coconut milk and stock; simmer 30 minutes.",
      "Top with cilantro and serve."
    ]
  },
  {
    id: 11,
    title: "Tomato Basil Soup",
    description: "Creamy tomato soup finished with fresh basil.",
    meta: { prep: "10 mins", cook: "30 mins", serves: "4" },
    ingredients: [
      "2 tbsp olive oil",
      "1 onion, diced",
      "2 cloves garlic",
      "2 cans crushed tomatoes",
      "2 cups vegetable broth",
      "1/2 cup cream",
      "Fresh basil leaves"
    ],
    steps: [
      "Cook onion and garlic until soft.",
      "Add tomatoes and broth; simmer 20 minutes.",
      "Blend until smooth.",
      "Stir in cream and basil; serve warm."
    ]
  },
  {
    id: 12,
    title: "Veggie Fried Rice",
    description: "Quick fried rice with mixed vegetables and soy sauce.",
    meta: { prep: "15 mins", cook: "10 mins", serves: "4" },
    ingredients: [
      "3 cups cooked rice",
      "2 eggs, beaten",
      "1 cup frozen peas & carrots",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 green onions"
    ],
    steps: [
      "Scramble eggs and set aside.",
      "Stir fry vegetables until hot.",
      "Add rice, soy, and sesame oil; stir fry.",
      "Return eggs; mix and garnish with green onions."
    ]
  },
  {
    id: 13,
    title: "Margherita Pizza",
    description: "Classic pizza with fresh tomato, mozzarella, and basil.",
    meta: { prep: "20 mins", cook: "15 mins", serves: "2–3" },
    ingredients: [
      "1 pizza dough",
      "1/2 cup tomato sauce",
      "8 oz fresh mozzarella",
      "Fresh basil leaves",
      "Olive oil"
    ],
    steps: [
      "Stretch dough onto pizza stone or pan.",
      "Spread tomato sauce evenly.",
      "Top with mozzarella and basil.",
      "Drizzle with olive oil and bake at 500°F for 10–12 mins."
    ]
  },
  {
    id: 14,
    title: "Guacamole",
    description: "Creamy avocado dip with lime, cilantro, and onion.",
    meta: { prep: "10 mins", cook: "0 mins", serves: "4" },
    ingredients: [
      "3 ripe avocados",
      "1 lime, juice",
      "1/4 cup onion, finely chopped",
      "1 jalapeño, minced",
      "2 tbsp cilantro",
      "Salt"
    ],
    steps: [
      "Mash avocados in a bowl.",
      "Stir in lime, onion, jalapeño, and cilantro.",
      "Season with salt; serve with chips."
    ]
  },
  {
    id: 15,
    title: "Chocolate Chip Cookies",
    description: "Classic chewy cookies with chocolate chips.",
    meta: { prep: "15 mins", cook: "12 mins", serves: "24 cookies" },
    ingredients: [
      "1 cup butter",
      "1 cup sugar",
      "2 eggs",
      "2 tsp vanilla",
      "2.5 cups flour",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "2 cups chocolate chips"
    ],
    steps: [
      "Cream butter and sugar.",
      "Beat in eggs and vanilla.",
      "Mix in dry ingredients.",
      "Fold in chocolate chips.",
      "Scoop onto tray; bake at 350°F for 10–12 mins."
    ]
  }
];
