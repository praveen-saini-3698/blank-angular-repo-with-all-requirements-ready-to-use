import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private http: HttpClient,
  ) { }

  public post(url, body) {
    return new Promise((resolve, reject) => {
      try {
        let headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        });
        this.http.post(url, body, { headers }).subscribe(data => {
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public get(url) {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(url).subscribe(data => {
          resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public navigateTo(page = "login") {
    this.router.navigateByUrl(page);
  }

  public navigateWithData(page = "login", data: any) {
    let set: any = { page: page, data: data };
    this.router.navigate([page], set);
  }

  showLoader() {
    this.spinner.show();
  }

  hideLoader() {
    this.spinner.hide();
  }

  showSuccess(message = "Completed!", title = "Success") {
    this.toastr.success(message, title, {
      timeOut: 2000,
      closeButton: true,
      positionClass: 'toast-center-center'
    });
  }

  showError(message = "Something went Wrong!", title = "Error") {
    this.toastr.error(message, title, {
      timeOut: 2000,
      closeButton: true,
      positionClass: 'toast-center-center'
    });
  }

  showWarning(message = "Please check!", title = "Warning") {
    this.toastr.warning(message, title, {
      timeOut: 2000,
      closeButton: true,
      positionClass: 'toast-center-center'
    });
  }

  showInfo(message = "Please check!", title = "Info") {
    this.toastr.info(message, title, {
      timeOut: 2000,
      closeButton: true,
      positionClass: 'toast-center-center'
    });
  }

  setLocal(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  }

  getLocal(key, callback) {
    try {
      let data = window.localStorage.getItem(key);
      if (data) {
        callback(null, JSON.parse(data));
      } else {
        callback("not exists in local storage", null);
      }
    } catch (error) {
      throw error;
    }
  }
}
