import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {BookSchelfService} from "../services/book-schelf.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  bookForm !: FormGroup;
  actionButton: string = "Save";

  constructor(private formBuilder: FormBuilder,
              private api: BookSchelfService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      isbn: ['', Validators.required],
      name: ['', Validators.required],
      author: ['', Validators.required],
      annotation: ['']
    });

    if (this.editData) {
      this.actionButton = "Update";
      this.bookForm.controls['isbn'].setValue(this.editData.isbn);
      this.bookForm.controls['isbn'].disable();
      this.bookForm.controls['name'].setValue(this.editData.name);
      this.bookForm.controls['author'].setValue(this.editData.author);
      this.bookForm.controls['annotation'].setValue(this.editData.annotation);
    }
  }

  createOrUpdate() {
    if (this.bookForm.valid) {
      if (this.editData) {
        this.updateBook();
      } else {
        this.addBook();
      }

      this.dialogRef.close('save');
    } else {
      alert("Form is invalid");
    }
  }

  addBook() {
    console.log("Go to create book...");

    this.api.addBook(this.bookForm.value)
        .subscribe({
          error:()=>{
            alert("Error [Add Book]");
          }
        });
  }

  updateBook() {
    console.log("Go to update book...");

    this.api.updateBook(this.editData.isbn, this.bookForm.value)
      .subscribe({
        error:()=>{
          alert("Error [Update Book]");
        }
      });
  }

}
