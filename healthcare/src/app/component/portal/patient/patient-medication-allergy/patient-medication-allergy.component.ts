import { Component, OnInit } from '@angular/core';
import { CustomSnackBarService } from 'src/app/services/snackbar.service';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Med_allergy, Users } from 'src/model/tabletypes';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-medication-allergy',
  templateUrl: './patient-medication-allergy.component.html',
  styleUrls: ['./patient-medication-allergy.component.css'],
})
export class PatientMedicationAllergyComponent implements OnInit {
  med_allergy_form: FormGroup;
  user : Users;

  constructor(
    private _medi_allergyService: PatientService,
    private fb: FormBuilder,
    private _snack: CustomSnackBarService,
    private _userService : UserService
  ) {}

  ngOnInit(): void {
    // this.updateData("HtWlS9M");
    this.user = this._userService.getUserDetails();
    console.log(this._medi_allergyService.getData);
    this.med_allergy_form = this.fb.group({
      social_drugs: ['', Validators.required],

      other_allergies_reaction: ['', Validators.required],
      drug_allergies: ['', Validators.required],
    });
  }

  createPatientAllergyDetails() {
    let Patient_Medical_Allergy: Med_allergy = new Med_allergy();

    Patient_Medical_Allergy.social_drugs = this.social_drugs.value;
    Patient_Medical_Allergy.other_allergies_reaction =
      this.other_allergies_reaction.value;
    Patient_Medical_Allergy.drug_allergies = this.drug_allergies.value;
    Patient_Medical_Allergy.patient_id = this.user.id;


    this._medi_allergyService
      .createmedicationallergy(Patient_Medical_Allergy)
      .subscribe((data) => {
        this._snack.openSnackBar('Allergy information added!');
      });
    this.med_allergy_form.reset();
  }

  updateData(id: string) {
    return this._medi_allergyService.getData(id).subscribe(console.log);
  }
  get social_drugs(): AbstractControl {
    return this.med_allergy_form.get('social_drugs');
  }

  get drug_allergies(): AbstractControl {
    return this.med_allergy_form.get('drug_allergies');
  }
  get other_allergies_reaction(): AbstractControl {
    return this.med_allergy_form.get('other_allergies_reaction');
  }
}
