import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
interface UsersDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  gender: string;
}
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  genders = [
    {
      name: 'Male',
      value: 'male',
    },
    {
      name: 'Female',
      value: 'female',
    },
  ];
  usersDetails: UsersDetails[] = [
    {
      id: 1,
      firstName: 'divya',
      lastName: 'gabani',
      email: 'divya@gmail.com',
      mobileNo: '9874563210',
      gender: 'female',
    },
  ];
  submitted = false;
  profileForm!: FormGroup;
  editForm!: UsersDetails;
  editId!: number;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createProfileForm();
  }
  get profileFormControl() {
    return this.profileForm.controls;
  }
  createProfileForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  blockCharacter(e: any) {
    var x = e.which || e.keycode;
    if (x >= 42 && x <= 57) return true;
    else return false;
  }
  onSubmit() {
    if (this.profileForm.invalid) {
      this.submitted = true;
      return;
    } else {
      if (this.editId) {
        let editForm = {
          id: this.editId,
          ...this.profileForm.value,
        };
        console.log(editForm);

        this.usersDetails[this.editId] = editForm;
      } else {
        let data = {
          id: this.usersDetails.length + 1,
          ...this.profileForm.value,
        };
        this.usersDetails.push(data);
      }
    }
    this.profileForm.reset();
    this.submitted = false;
  }
  handleEdit(data: UsersDetails, id: number) {
    console.log(data.id);
    this.profileForm.patchValue(data);
    this.editId = data.id;
    this.editForm = data;
  }
  handleDelete(index: number) {
    this.usersDetails.splice(index, 1);
  }
}
