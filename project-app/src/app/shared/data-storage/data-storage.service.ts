import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../../recipes/recipe.service";
import {Recipe} from "../../recipes/recipe-list/recipe.model";
import {map, tap} from "rxjs/operators";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  token!: string | null;
  tokenSub!: Subscription;

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
    this.tokenSub = this.authService.user.subscribe(
      user => {
        this.token = user.token;
      }
    )
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(
      'https://recipebook-2b443-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes).subscribe((response) => {
      }
    );
  }

  fetchRecipes() {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>('https://recipebook-2b443-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
    //       {
    //         params: new HttpParams().set('auth', <string>user.token)
    //       })
    //   }),
    //   map(recipes => {
    //     return recipes.map(recipe => {
    //       return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
    //     });
    //   }),
    //   tap(recipes => {
    //     this.recipeService.setRecipes(recipes);
    //   })
    // );
    return this.http.get<Recipe[]>('https://recipebook-2b443-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      // {
      //   params: new HttpParams().set('auth', <string>this.token)
      // }
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }
}
