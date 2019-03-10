import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  navEnd: NavigationEnd;

  constructor(private dataStorageServe: DataStorageService, private router: Router, public authService: AuthService) {

    this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd)
    )
    .subscribe( (navEnd:NavigationEnd) => {
      this.navEnd = navEnd;
      console.log(navEnd.urlAfterRedirects);
    });
  }

  ngOnInit() {
    // console.log(routerState);
  }

  onSaveData() {
    if(this.navEnd.urlAfterRedirects === "/recipes") {
      this.dataStorageServe.storeRecipes()
      .subscribe(
        // HttpEvent and HttpEventType let us see more about the Http responses and events going on
        // (response: HttpEvent<Object>) => {
        //   console.log(response.type === HttpEventType.Response);
        // }
        (response) => {
          console.log(response);
        }
      );
    }
    if(this.navEnd.urlAfterRedirects === "/shopping-list") {
      this.dataStorageServe.storeIngredients()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
    }
  }

  onFetchData() {
    if(this.navEnd.urlAfterRedirects === "/recipes") {
      this.dataStorageServe.fetchRecipes();
    }
    if(this.navEnd.urlAfterRedirects === "/shopping-list") {
      this.dataStorageServe.fetchIngredients();
    }
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
