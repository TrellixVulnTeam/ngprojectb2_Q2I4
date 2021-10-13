import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
// import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements  OnDestroy {
  mobileQuery: MediaQueryList;

  // fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);

  // fillerContent = Array.from({length: 10}, () =>
  //     `we are consistently delivers best-in-class solutions and an unmatched 
  //     cost advantage to healthcare organizations worldwide.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 500px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onlogout(){
    this._userService.logout();
  }
  // isLoggedIn$: Observable<boolean>; 
  // ngOnInit() {
  //   this.isLoggedIn$ = this._userService.isLoggedIn; // {2}
  // }
}

