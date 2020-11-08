import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export const constants = {
  regexp: {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /^(?=.*\S).+$/
  }
}

export function patternValidator(regexp: RegExp): any {
  return (control: AbstractControl): any => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
  };
}

export interface IFormData {
  email: string;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  myForm: FormGroup;
  myFormData: IFormData;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initMyForm();
  }

  initMyForm(): void {
    this.myForm = this.fb.group({
      'name': [null, [
        Validators.required,
        patternValidator(constants.regexp.name)
      ]],
      'email': [null, [
        Validators.required,
        patternValidator(constants.regexp.email)
      ]],
      'phone': [null]
    });
  }

  onSubmit(formData: IFormData): void {
    this.myFormData = formData;
  }
}
