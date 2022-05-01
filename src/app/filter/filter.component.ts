import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookSchelfService} from "../services/book-schelf.service";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  static searchIsbn: string = '';
  static searchName: string = '';
  static searchAuthor: string = '';

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private api: BookSchelfService,
              private dialogRef: MatDialogRef<FilterComponent>) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      isbn: [FilterComponent.searchIsbn],
      name: [FilterComponent.searchName],
      author: [FilterComponent.searchAuthor]
    });
  }

  clearAndSearch() {
    this.searchForm.controls['isbn'].setValue('');
    this.searchForm.controls['name'].setValue('');
    this.searchForm.controls['author'].setValue('');

    FilterComponent.searchIsbn = '';
    FilterComponent.searchName = '';
    FilterComponent.searchAuthor = '';

    this.dialogRef.close('search');
  }

  applyAndSearch() {
    FilterComponent.searchIsbn = this.searchForm.controls['isbn'].value;
    FilterComponent.searchName = this.searchForm.controls['name'].value;
    FilterComponent.searchAuthor = this.searchForm.controls['author'].value;

    this.dialogRef.close('search');
  }
}
