import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  // Es lo mismo, solo que la sintaxis de abajo resulta mas legible
  // public myDinamicForm2 = new FormGroup({
  //   favoriteGames: new FormArray ([])
  // })

  public myDinamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    // se crea un arreglo de forms controls
    favoriteGames: this.fb.array([
      ['Gears of war', Validators.required],
      ['Halo Reach', Validators.required],

    ])

  })

  // para agergar lo hacemos con nuestra propiedad de un formcontrol
  public newFavorite: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  constructor(private fb: FormBuilder) { }

  // obtenemos los juegos favoritos por medio de un getter para que sea mas legible el html
  get favoriteGames() {
    return this.myDinamicForm.get('favoriteGames') as FormArray;
  }

  // Método para verificar si un campo es valido o no (siempre y cuando pertenezca al formulario)
  isValidField(fieled: string): boolean | null {
    return this.myDinamicForm.controls[fieled].errors
      && this.myDinamicForm.controls[fieled].touched;
  }

  getFieldError(field: string): string | null {
    // si no existe el campo que pide el usuario retorna null
    if (!this.myDinamicForm.controls[field]) return null;

    const errors = this.myDinamicForm.controls[field].errors || {};

    // con object.keys obtenemos todos los errores que se disparan en nuestro form
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          //  ${ errors['minlength'].requiredLength} es para que obtenga en automatico el numero de caracteres minimo
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
      }
    }
    // si no encuentro errores en el campo pues retorno null
    return null;
  }

  // metodo para veridicar si no es valido algun campo dinamico
  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // forma tradicional:
    // this.favoriteGames.push( new FormControl (newGame, Validator.required ));
    // forma con el form builder
    this.favoriteGames.push(
      this.fb.control( newGame,[Validators.minLength(3)])
    );

    // reseteamos el campo
    this.newFavorite.reset();

  }


  // método para eliminar favoritos
  ondDeleteFavorite(index: number): void {
    // por medio del get que tenemos en favoriteGames lo podemos eliminar
    // siendo esta una propiedad de los arraays y no de los forms
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    if (this.myDinamicForm.invalid) {
      this.myDinamicForm.markAllAsTouched();
      return;
    }

    console.log(this.myDinamicForm.value);
    // reseteamos los valores dinamicos
    //* con () as formArray le indicamos que lo tratara como un formArray
    (this.myDinamicForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myDinamicForm.reset();

  }

}
