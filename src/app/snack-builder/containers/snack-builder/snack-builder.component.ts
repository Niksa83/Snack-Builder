import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'snack-builder-app',
    styleUrls: ['snack-builder.component.scss'],
    template: `
       <div class="container-fluid">

        <div class="row">
            <div class="col-sm-8 form-container">

            <snack-form 
              [parent]="form"
              (add)="handleAddSnack()"
              (remove)="handleRemoveSnack($event)"
              (toggle)="handleActiveSnack($event)"
              (submit)="handleSubmit($event)"
              [base]="basePrice"
              [calories]="baseCalories"
              [total]="totalPrice">
            </snack-form>

        </div><!--/.col-sm-8-->
        <!-- sidebar  -->
        <div class="snack-preview col-sm-4 visible-sm-block visible-md-block visible-lg-block">
            
            <snack-preview
                [total]="totalPrice"
                [activeSnack]="activeSnack"
                [snacks]="form.get('snacks')"
                [calories]="baseCalories">
            </snack-preview>

        </div><!-- /.col-sm-4 visible-sm-block visible-md-block visible-lg-block -->
    </div>

           

       </div><!--/.container-->
 <!-- <div>Icons made by <a href="http://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> -->

    `
})
export class SnackBuilderComponent implements OnInit {
    
    activeSnack:number = 0;
    totalPrice:number = 0;
    basePrice:number = 8;
    baseCalories:number = 400;

    constructor(private fb: FormBuilder){}

    form = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        adress: ['', Validators.required],
        snacks: this.fb.array([
            this.createSnack()
        ])
    });

    private control = this.form.get('snacks') as FormArray;

    ngOnInit(){
        this.calculateTotal(this.form.get('snacks').value);
        
        this.form.get('snacks').
        valueChanges
        .subscribe( value => this.calculateTotal(value));
    }

    createSnack(){
        return this.fb.group({
            ingredients: [[]]
        });
    }

    handleAddSnack(){
        this.control.push(this.createSnack());
    }

    handleRemoveSnack(index:number){
        this.control.removeAt(index);
    }

    handleActiveSnack(index:number){
        this.activeSnack = index;
    }

    calculateTotal(value){

        // an array containing arrays of prices from every snack [ [2,3], [5]]
        const pricesArray = value.map((x)=> {
            return  x.ingredients.map((ingredient)=> ingredient.price)
        }); 

        const merged = pricesArray.reduce( (accum,next)=>  accum.concat(next) );
      
        const price = merged.reduce( (accum :number, next: number) => {
            return accum + next;
        },0);

      this.totalPrice = price + (this.basePrice * this.control.length);

    }

    handleSubmit(event){
        console.log(event);
    }


}