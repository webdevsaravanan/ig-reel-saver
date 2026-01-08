import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: false,
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent {
 @Input() active: 'search' | 'favorite' | 'profile' = 'search';

  constructor(private router: Router) {}

  goSearch() {
    this.router.navigate(['/']);
  }

  goFavorites() {
    this.router.navigate(['/'], { queryParams: { view: 'favorite' } });
  }

  goAdd() {
    this.router.navigate(['/add']);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }
}
