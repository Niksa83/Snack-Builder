import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'snack-form',
    styleUrls: ['snack-form.component.scss'],
    template: `

            <h1>Create your snack on the line !</h1>
            <hr />
            <h3>1.Where do we bring the food?</h3>
            <form (ngSubmit)="onSubmit($event)" [formGroup]="parent" novalidate>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Your name: <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="name" placeholder="John Doe" formControlName="name">
                    </div>       
                </div><!--/.col-md-6-->
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Email: <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="name" placeholder="john@mail.com" formControlName="email">
                    </div>       
                </div><!--/.col-md-6-->
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Phone: <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="name" placeholder="095 123456" formControlName="phone">
                    </div>       
                </div><!--/.col-md-6-->
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Adress: <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="name" placeholder="Some street 12" formControlName="adress">
                    </div>       
                </div><!--/.col-md-6-->
            </div>

            <hr />

            <snack-creator
                [snacks]="this.parent.get('snacks')"
                (add)="addSnack($event)"
                (toggle)="setActive($event)"
                (remove)="removeSnack($event)">
            </snack-creator>

            <snack-total
                [total]="total"
                [base]="base"
                [calories]="calories"
                [parent]="parent">
            </snack-total>

            </form>
                 <pre>{{parent.value | json }}</pre> 
                

    `
})
export class SnackFormComponent  {

    @Input()
    parent:FormGroup;

    @Input()
    total:number;

    @Input()
    base:number;

    @Input()
    calories:number;

    @Output()
    add = new EventEmitter<any>();

    @Output()
    remove = new EventEmitter<any>();

    @Output()
    toggle = new EventEmitter<number>();

    @Output()
    submit = new EventEmitter<any>();

    addSnack(event){
        this.add.emit(event);
    }

    removeSnack(event){
        this.remove.emit(event);
    }

    setActive(event){
        this.toggle.emit(event);
    }

    onSubmit(event){
        event.stopPropagation();
        this.submit.emit(this.parent);
    }

}