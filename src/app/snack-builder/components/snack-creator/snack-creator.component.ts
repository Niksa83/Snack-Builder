import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
    selector: 'snack-creator',
    styleUrls: ['snack-creator.component.scss'],
    template: `
        <div class="row">
            <div class="col-xs-7">
                <h3>2.Build Your snack:</h3>
            </div>
            <div class="col-xs-5">
                <button type="button" class="btn btn-success" (click)="addSnack()">+ Add another snack!</button>
            </div>
        </div><!--/. row-->

        <div class="row snack-row"  *ngFor="let snack of snacks.controls; let i = index;">
            <div class="col-xs-8">
                <h4 (click)="toggleSnack(i)">
                    Snack {{i + 1}}
                    <span 
                        class="glyphicon"
                        [class.glyphicon-chevron-down]="activeSnack == i"
                        [class.glyphicon-chevron-up]="activeSnack !== i">
                    </span>
                </h4>
            </div>
            <div class="col-xs-4">
                <span 
                    class="glyphicon glyphicon-trash" 
                    aria-hidden="true"
                    *ngIf="snacks.controls.length > 1" 
                    (click)="removeSnack(i)">
                </span>
            </div>
            <div 
                class="col-xs-12 ingredient-content"
                [formGroup]="snack"
                [class.ingredient-content--open]="activeSnack == i">

                    <snack-ingredients formControlName="ingredients">
                    </snack-ingredients>

            </div><!--/.ingredient-content-->
            
        </div><!--/. row ngFor-->
    `
})
export class SnackCreatorComponent {

    private visibleSnack:number = 0;
    
    @Input()
    snacks:FormArray;

    @Output()
    add = new EventEmitter<any>();

    @Output()
    remove = new EventEmitter<number>();

    @Output()
    toggle = new EventEmitter<number>();

    get activeSnack(){
        return this.visibleSnack;
    }

    set activeSnack(index: number) {
        this.visibleSnack = index;
        // if index is NOT a negative value (our toggleSnack) emit it
        if (~index) {
           this.toggle.emit(index);
        }
    }

    addSnack(){
        this.add.emit();
        this.activeSnack = this.snacks.length-1;
    }

    removeSnack(index:number){
        this.remove.emit(index);
        this.activeSnack = this.snacks.length-1;
    }

    toggleSnack(index:number){
        if (this.activeSnack === index) {
            // if already selected set to negative value cause we always increment up to make sure it cannot exist
            this.activeSnack = -1;
            return;
        }
        this.activeSnack = index;
    }

}