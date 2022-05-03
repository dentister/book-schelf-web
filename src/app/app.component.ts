import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {BookSchelfService} from "./services/book-schelf.service";
import {MatTableDataSource} from '@angular/material/table';
import {FilterComponent} from "./filter/filter.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'book-schelf-web';
  displayedColumns: string[] = ['isbn', 'name', 'author', 'annotation', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: BookSchelfService) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getBooks();
      }
    });
  }

  openFilterDialog() {
    this.dialog.open(FilterComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'search') {
        this.getBooks();
      }
    });
  }

  getBooks() {
    this.api.searchBooks(FilterComponent.searchIsbn, FilterComponent.searchName, FilterComponent.searchAuthor)
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(res);
        },
        error:(err)=>{
          alert("Error occurred during search of books:" + err);
        }
      });
  }

  editBook(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(value => {
        if (value === 'save') {
          this.getBooks();
        }
      });
  }

  deleteBook(isbn: number) {
    this.api.deleteBook(isbn)
      .subscribe(()=>{
        this.getBooks();
        console.log("Book was successfully removed");
      });
  }
}
