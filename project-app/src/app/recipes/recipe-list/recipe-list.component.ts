import { Component, OnInit } from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'test', 'https://www.acouplecooks.com/wp-content/uploads/2021/03/' +
      'Cheese-Tortellini-011-735x919.jpg'),
    new Recipe('A Test Recipe', 'test', 'https://www.acouplecooks.com/wp-content/uploads/2021/03/' +
      'Cheese-Tortellini-011-735x919.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
