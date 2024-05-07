import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {


  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value


    const httpCallObservable = new Observable<ValidationErrors | null>( (suscriber) =>{
      console.log({ email });
      if (email === 'marco@gmail.com'){
        // .next(valor) emite valores de observable
        suscriber.next({emailTaken: true})
        // nos desuscribe del observable
        suscriber.complete();
      }

      suscriber.next(null);
      suscriber.complete();
    }).pipe(
      delay(3000)
    )

    return httpCallObservable;
  }

  /** primer método implementado*/
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {

  //   const email = control.value
  //   console.log({ email });


  //   return of({
  //     message: 'email is taken!',
  //     emailTaken: true
  //   }).pipe(
       // ingresamos un delay para ver que el form tiene 3 estatus INVALID, VALID
       // y PENDING (el cual pasa mientras se ejecuta una validacion asincrona)
  //     delay(2000)
  //   )
  // }


}
