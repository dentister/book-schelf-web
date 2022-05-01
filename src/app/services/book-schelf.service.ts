import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:8080/book-schelf-api/v1/books';

@Injectable({
  providedIn: 'root'
})
export class BookSchelfService {

  constructor(private http: HttpClient) { }

  searchBooks(isbn: string, name: string, author: string) {
    let queryParams = new HttpParams();

    queryParams = name.length != 0 ? queryParams.set("name", name) : queryParams;
    queryParams = author.length != 0 ? queryParams.set("isbn", author) : queryParams;
    queryParams = isbn.length != 0 ? queryParams.set("isbn", isbn) : queryParams;

    return this.http.get<any>(`${baseUrl}/search`, {params:queryParams});
  }

  addBook(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/create`, data);
  }

  updateBook(isbn: number, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/${isbn}/update`, data);
  }

  deleteBook(isbn: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${isbn}/delete`);
  }
}
