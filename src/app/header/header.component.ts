import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  navEnd: NavigationEnd;

  constructor(private dataStorageServe: DataStorageService, private router: Router, private authService: AuthService) {

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
        (response: Response) => {
          console.log(response);
        }
      );
    }
    if(this.navEnd.urlAfterRedirects === "/shopping-list") {
      this.dataStorageServe.storeIngredients()
      .subscribe(
        (response: Response) => {
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
}
