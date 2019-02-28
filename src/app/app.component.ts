import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDcqbAkdbeMkINATo8Dh7ELWhqOOtORjwk",
      authDomain: "ng-recipe-book-46810.firebaseapp.com"
    });

    // this.authService.autoAuth();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
