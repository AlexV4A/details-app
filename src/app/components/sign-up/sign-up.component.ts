import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public formGroup: any;
  public formRegGroup: any;
  public post: any = '';
  public hide: boolean = true;
  public confhide: boolean = true;
  public matcher : any;

  constructor(private formBuilder: FormBuilder, private httpClientService: HttpClientService,
    private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  /**
   * createForm
   */
  private createForm(){
    this.formRegGroup = this.formBuilder.group({
      'userfirstname': [null, Validators.required],
      'userlastname': [null, Validators.required],
      'useremail': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([
        Validators.required,
        CustomValidators.patternValidator('hasNumber'),
        CustomValidators.patternValidator('hasCapitalCase'),
        CustomValidators.patternValidator('hasSmallCase'),
        CustomValidators.patternValidator('hasSpecialCharacters'),
        Validators.minLength(8)])],
      'confirmPassword': [null, Validators.required]
    },{
      validators: CustomValidators.passwordMatchValidator
    });             
  }

  /**
   * clearRegistrationInput
   * @param feild 
   */
  public clearRegistrationInput(feild :string) {
    this.formRegGroup.get(feild).setValue('');
  }
  
  /**
   * onSubmit
   * @param post 
   */
  public onSubmit(post: any) {
    this.post = post;
  }

  /**
   * saveRegistrationEntry
   */
  public saveRegistrationEntry(){
    if(this.formRegGroup.valid){
      this.httpClientService.submitFormData(this.formRegGroup.getRawValue()).subscribe({
        next: (res) => {console.log('RES ', res)},
        error:  (error) => {console.log('RES ', error)}
     });
      this.clearEntry();
    }    
  }

  /**
   * clearRegistrationEntry
   */
  public clearRegistrationEntry(){
    this.formRegGroup.reset();
    this.cdr.detectChanges();
  }

  /**
   * clearEntry
   */
  public clearEntry(){
    this.formRegGroup.reset();
    this.cdr.detectChanges();
  }
}
