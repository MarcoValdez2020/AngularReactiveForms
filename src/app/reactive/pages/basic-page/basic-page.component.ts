import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const producto = {
  name:'producto precargado',
  price: 2500,
  inStorage: 1200,
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})

export class BasicPageComponent implements OnInit{

  // forma tradicional de hacerlo
  /*  public myForm: FormGroup = new FormGroup({
      name: new FormControl('',[],[]),
      price: new FormControl('',[],[]),
      inStorage: new FormControl('',[],[]),

    });*/

  public myForm: FormGroup = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: [0,[Validators.required, Validators.min(0)]],
    inStorage: [0,[Validators.required, Validators.min(0)]],

  })


  // forma con formbluider
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
   // this.myForm.reset(producto)
  }

  // Método para verificar si un campo es valido o no
  isValidField(fieled:string): boolean | null {
    return this.myForm.controls[fieled].errors
      && this.myForm.controls[fieled].touched;
  }

  getFieldError(field:string):string | null{
    // si no existe el campo que pide el usuario retorna null
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    // con object.keys obtenemos todos los errores que se disparan en nuestro form
    for (const key of Object.keys(errors)) {
      switch( key){
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          //  ${ errors['minlength'].requiredLength} es para que obtenga en automatico el numero de caracteres minimo
          return `El campo debe tener al menos ${ errors['minlength'].requiredLength} caracteres`
      }
    }
    // si no encuentro errores en el campo pues retorno null
    return null;
  }

  onSave():void {
    if (!this.myForm.valid) {
      // para que valide si el usuario dejo algun campo en blanco
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    // para reestablecer usamos: this.myForm.reset({price:0,inSotage0})
    // el cual recibe de valor un objeto y relaciona con las propiedades que
    // hacen match
    this.myForm.reset({name:'',price:0,inStorage:0})
  }

}
