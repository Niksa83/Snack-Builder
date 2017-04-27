import { Component, forwardRef  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Ingredient } from '../../models/ingredient.interface';

const INGREDIENTS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SnackIngredientsComponent),
  multi: true
};

@Component({
    selector: 'snack-ingredients',
    styleUrls: ['snack-ingredients.component.scss'],
    providers: [INGREDIENTS_ACCESSOR],
    template: `
    <div class="well">
        <div class="row">
            <div class="col-xs-6 col-sm-4" *ngFor="let ingredient of ingredients">
              <label 
                class="ingredient"
                [class.ingredient--active]="value.includes(ingredient)"
                [class.ingredient--focused]="focused === ingredient">
                <input
                    type="checkbox"
                    [attr.name]="ingredient.name"
                    [attr.value]="ingredient.name"
                    (blur)="onBlur(ingredient)"
                    (focus)="onFocus(ingredient)"
                    (change)="updateIngredient(ingredient)">
                  <span class="ingredient__icon ingredient__icon--{{ ingredient.slug }}"></span>
                    {{ ingredient.name | titlecase }}
              </label>
            </div>
        </div><!--/.row-->
    </div>
    `
})
export class SnackIngredientsComponent implements ControlValueAccessor {

   ingredients: Ingredient[] = [
        {id: 1, name : 'mayonnaise', slug:'mayonnaise', calories: 350, price: 2},
        {id: 2, name : 'ketchup', slug:'ketchup', calories: 55, price: 2},
        {id: 3, name: 'pickled cucumber', slug:'cucumber', calories: 10, price: 3},
        {id: 4, name: 'lettuce', slug:'lettuce', calories: 14, price: 1},
        {id: 5, name: 'tomato', slug:'tomato', calories: 10, price: 2},
        {id: 6, name: 'cheddar cheese', slug:'cheese', calories: 200, price: 4},
        {id: 7, name: 'ham', slug:'ham', calories: 145, price: 4},
        {id: 8, name: 'sausage', slug:'sausage', calories: 160, price: 5},
        {id: 9, name: 'eggs', slug:'eggs', calories: 155, price: 3}
    ];

    value: Ingredient[] = [];
    focused: Ingredient;

    private onTouch: Function;
    private onModelChange: Function;

    registerOnChange(fn) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    writeValue(value) {
        this.value = value;
    }

    onBlur(value:Ingredient){
        this.focused = null;
    }

    onFocus(value:Ingredient){
        this.focused = value;
        this.onTouch();
    }

    updateIngredient(ingredient: Ingredient){

        if(this.value.includes(ingredient)){
            this.value = this.value.filter( (x:Ingredient) => x !== ingredient )
        } else {
            this.value = [...this.value, ingredient ];
        }
        // notify change
        this.onModelChange(this.value);
    }


    
}