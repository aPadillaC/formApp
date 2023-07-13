import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // public myForm2 = new FormGroup({

  //   favoriteGames: new FormArray([])
  // })


  // Formularios Dinámicos
  public myForm: FormGroup = this.fb.group({

    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    favoriteGames: this.fb.array([

      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  })


  public newFavorite: FormControl = new FormControl('', [ Validators.required]);


  constructor( private fb: FormBuilder) { }



  get listGames() {

    return this.myForm.get('favoriteGames') as FormArray
  }





  isNotValidField( field: string): boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched ;
  }


  getFieldError( field: string ): string | null {

    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch( key ) {

        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`
      }
    }

    return null;
  }


  // Validaciones para formulario dinámico

  isNotValidFieldArray( formArray: FormArray, index: number) {

    return formArray.controls[index].errors && formArray.controls[index].touched ;
  }



  // ----------------------------------------------


  onAddToFavorites(): void {

    if( this.newFavorite.invalid) return;

    // console.log( this.newFavorite.value);
    const newGame = this.newFavorite.value;

    this.listGames.push(
      this.fb.control( newGame, Validators.required)
    );

    this.newFavorite.reset();
  }


  onDeleteFavorite( index: number) {

    this.listGames.removeAt(index);
  }

  onSubmit(): void {

    if( this.myForm.invalid) {

      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();

  }
}
