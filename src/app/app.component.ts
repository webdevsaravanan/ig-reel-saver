import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    const shared = new URLSearchParams(window.location.search).get('text');
    if (shared?.includes('instagram.com/reel')) {
      this.router.navigate(['/add'], { queryParams: { reelUrl: shared } });
    }
  }
}
