import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { cantBeStrider } from 'src/app/shared/validators/validators';
// import * as customValidators from 'src/app/shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';


@Component({
  templateUrl: './register-page.component.html',

})

export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({

    // name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    // username: ['', [Validators.required, customValidators.cantBeStrider]],
    // password: ['', [Validators.required, Validators.minLength(6)]],
    // password2: ['', [Validators.required]]

    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidator()]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    // PARA EVALUAR VARIOS CAMPOS
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}


  isValidField( field: string) {

    return this.validatorsService.isValidField( this.myForm, field)
  }

  onSubmit() {

    this.myForm.markAllAsTouched();
  }
}
