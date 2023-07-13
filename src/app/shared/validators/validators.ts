import { FormControl, ValidationErrors } from "@angular/forms";

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


export const cantBeStrider = (control: FormControl): ValidationErrors | null => {


  // elimina los espacios en blanco de ambos extremos de una cadena y devuelve una nueva cadena, sin modificar la cadena original.
  const value: string = control.value.trim().toLowerCase();

  // const value: string = control.value.toLowerCase();

  if ( value === 'strider' ) {

    return {
      noStridrer: true
    }
  }


  return null;
}
