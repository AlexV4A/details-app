import { ValidationErrors, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {

  /**
   * 
   * @param errorType 
   * @returns 
   */
  static patternValidator(errorType: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return {'noerror': true};
      }
      const numberPattern = /\d/;
      const capitalPattern = /[A-Z]/;
      const smallPattern = /[a-z]/;
      const specialPattern = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      let valid;
      
      if(errorType === 'hasNumber'){
        valid = numberPattern.test(control.value);
      }
      else if(errorType === 'hasCapitalCase') {
        valid = capitalPattern.test(control.value);
      }
      else if(errorType === 'hasSmallCase') {
        valid = smallPattern.test(control.value);
      }
      else if(errorType === 'hasSpecialCharacters') {
        valid = specialPattern.test(control.value);
      }
      let obj : any = {}
      obj[errorType] = true;
      return valid ? null : obj;
    };
  }
  /**
   * 
   * @param control 
   * @returns 
   */
  static passwordMatchValidator(control: any) {
    const password: any = control.get('password'); 
    const confirmPassword: any = control.get('confirmPassword'); 
    
    if (password?.value !== confirmPassword?.value) {
      confirmPassword.setErrors({ NoPassswordMatch: true });
      return { NoPassswordMatch: true }
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }
}
