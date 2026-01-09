import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const sharedText = params['text'] || params['android.intent.extra.TEXT'];
      if (sharedText) {
        // Handle the shared content here
        console.log('Shared content:', sharedText);
        // For example, if it's an Instagram URL, navigate to add page
        if (sharedText.includes('instagram.com')) {
          this.router.navigate(['/add'], {
            queryParams: { reelUrl: sharedText }
          });
        } else {
          // Handle other shared content, e.g., display it or process it
          // For now, just log it
        }
      }
    });
  }
}
