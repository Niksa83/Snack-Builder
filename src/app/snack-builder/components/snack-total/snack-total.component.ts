import { Component, Input, OnInit } from '@angular/core';
import { FormGroup  } from '@angular/forms';

@Component({
    selector: 'snack-total',
    styleUrls: ['snack-total.component.scss'],
    template: `
    <div class="row">
        <div class="col-xs-12">
                <h3>3.Your order:</h3>
                <table class="table table-hover"> 
                    <thead> 
                        <tr> <th>Snack:</th> <th>ingredients</th> <th>Price:</th> <th>Calories: (kcal)</th> </tr> 
                    </thead> 
                    <tbody> 
                        <tr 
                            *ngFor="let snack of parent.get('snacks').value; let i = index;"> 
                            <th scope="row">Snack {{i + 1}}</th> 
                            <td> 
                                <span 
                                    *ngFor="let ingredient of snack.ingredients">
                                    {{ingredient.name}}, 
                                </span>
                            </td> 
                            <td>{{ snackPrice(snack) }}</td> 
                            <td class="text-warning">{{ calculateCalories(snack)}}</td> 
                        </tr> 
                    </tbody> 
                </table>
            <hr />
                <h2 class="text-center">Total order price : <span class="text-success">{{total }}</span></h2>
            <div class="well">
                <h4 *ngIf="parent.invalid" class="text-warning text-center">Please Fill in all contact data to make the order!</h4>
                <button 
                    type="submit" 
                    [disabled]="parent.invalid" 
                    class="btn btn-success btn-block">
                    Place order
                </button>
            </div>

        </div>
    </div>
    `
})
export class SnackTotalComponent implements OnInit {

    @Input()
    parent:FormGroup;

    @Input()
    total:number;

    @Input()
    base:number;

    @Input()
    calories:number

    ngOnInit(){
        
    }

     snackPrice(snack):number {
       const price = snack.ingredients.reduce((accum,next)=>{
            return accum + next.price;
       },0);

       return this.base + price;
    }

     calculateCalories(snack):number {
       const calories=  snack.ingredients.reduce((accum,next)=>{
            return accum + next.calories;
       },0);

       return this.calories + calories;
    }



}