import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CustomSnackBarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/model/tabletypes';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createuserForm: FormGroup;
  roles=["Admin","Physician"];
  constructor(  private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: CustomSnackBarService) { }

  ngOnInit(): void {
    console.log(this.createuserForm);
    this.createuserForm = this.fb.group(
      {
        //username: ['', [Validators.required, this.validateUsername.bind(this)]],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$'),
            Validators.minLength(10),
          ],
        ],
        dateofbirth: ['', Validators.required],
        userrole: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        retypepassword: ['', [Validators.required]],
        address: ['',Validators.required],
        emergencycontactname: ['', Validators.required],
        emergencycontactemail: ['', [Validators.required, Validators.email]],
        emergencycontactmobile: ['', [
          Validators.required,
          Validators.pattern('^(0|[1-9][0-9]*)$'),
          Validators.minLength(10),
        ]]
      },
      // {
      //   validator: this.MustMatch('password', 'retypepassword'),
      // }
    );
  }


  onUsercreate() {
    let userData: Users = new Users();
    userData.email = this.email.value;
    userData.role = this.userrole.value;
    userData.password = this.password.value;
    userData.firstname = this.firstname.value;
    userData.lastname = this.lastname.value;
    userData.phone = this.phone.value;
    userData.dob = this.dateofbirth.value;
    userData.address = this.address.value;
    userData.emergency_contact_name = this.emergencycontactname.value;
    userData.emergency_contact_email = this.emergencycontactemail.value;
    userData.emergency_contact_mobile = this.emergencycontactmobile.value


    this._userService.addUser(userData).subscribe((data: Users) => {
      if (data) {
          this._snackBar.openSnackBar('User created successfully');
          console.log("data",data)
      }
    },
    error =>{
      this._snackBar.openSnackBar(error);
    }
    );
  }

  
  get firstname(): AbstractControl {
    return this.createuserForm.get('firstname');
  }

  get lastname(): AbstractControl {
    return this.createuserForm.get('lastname');
  }

  get password(): AbstractControl {
    return this.createuserForm.get('password');
  }

  get retypepassword(): AbstractControl {
    return this.createuserForm.get('retypepassword');
  }

  get email(): AbstractControl {
    return this.createuserForm.get('email');
  }

  get phone(): AbstractControl {
    return this.createuserForm.get('phone');
  }

  get dateofbirth(): AbstractControl {
    return this.createuserForm.get('dateofbirth');
  }

  get userrole(): AbstractControl {
    return this.createuserForm.get('userrole');
  }

  get emergencycontactname(): AbstractControl {
    return this.createuserForm.get('emergencycontactname');
  }

  get emergencycontactemail(): AbstractControl {
    return this.createuserForm.get('emergencycontactemail');
  }

  get emergencycontactmobile(): AbstractControl {
    return this.createuserForm.get('emergencycontactmobile');
  }

  get address(): AbstractControl {
    return this.createuserForm.get('address');
  }


}
