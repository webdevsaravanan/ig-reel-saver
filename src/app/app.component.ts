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
     const params = new URLSearchParams(window.location.search);

    // Android share intent sends text
    const sharedUrl =
      params.get('url') ||
      params.get('text') ||
      params.get('sharedText');

    if (sharedUrl?.includes('instagram.com')) {
      this.router.navigate(['/add'], {
        queryParams: { reelUrl: sharedUrl }
      });
  }
}
}
