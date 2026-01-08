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
     const sharedUrl =
    params.get('text') ||
    params.get('android.intent.extra.TEXT');

  if (sharedUrl && sharedUrl.includes('instagram.com/reel')) {
    this.router.navigate(['/add'], {
      queryParams: { reelUrl: sharedUrl }
    });
  }
}
}
