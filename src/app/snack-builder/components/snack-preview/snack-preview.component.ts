import { Component, Input } from '@angular/core';
import {FormArray,FormGroup } from '@angular/forms';

import { transition, style, animate, trigger } from '@angular/animations';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate('300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate('200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({ transform: 'translateY(-200px)', opacity: 0 }))
  ])
]);

@Component({
    selector: 'snack-preview',
    styleUrls: ['snack-preview.component.scss'],
    animations: [DROP_ANIMATION],
    template : `
        
        <div class="row viewer">

            <h1 class="text-center">Total order price : <strong>{{total}}</strong></h1>
            <h4 class="text-center">Calories in your current snack:<span class="text-warning"> <strong>{{ calculateCalories(activeSnack) }}</strong></span></h4>

            <div class="snack-container">

                <div class="snack"
                *ngFor="let snack of snacks.controls; let i = index;"
                [class.snack--active]="activeSnack == i">
                    
                <!-- bottom bread slice -->
                <div class="snack__bread"></div>

                <!-- all the ingredients -->
                <div class="snack__ingredients">
                    <div *ngFor="let ingredient of snack.value.ingredients; let i = index;"
                        class="snack__ingredient snack__ingredient--{{ingredient.slug}}"
                        [style.zIndex]="i" @drop>
                    </div>
                
                </div><!--/.snack__ingredients-->

                </div><!-- /.snack -->

            </div>

        </div>
    
    `
})
export class SnackPreviewComponent {

    @Input()
    activeSnack:number;

    @Input()
    snacks:FormArray;

    @Input()
    total:number;

    @Input()
    calories:number

    currentCalories:number;


    calculateCalories(snack:number){
        // find the form group inside form array
        const control = this.snacks.at(snack).value;
        
        const result:number =  control.ingredients.reduce( (accum, next) => {
            return accum + next.calories;
        }, 0);

       return result + this.calories;
    }
    
}