import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  public canBeStrider = (control: FormControl):ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if( value === 'strider'){
      return {
        noStrider: true,
      }
    }

    return null;

  }

  // método para validar si el campo del formulario es valido
  public isValidField(form: FormGroup, field:string){
    return form.controls[field].errors
    && form.controls[field].touched;
  }

}
