import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isHidden:boolean = true;
constructor(private router: Router) {}
  /* 🌓 Dark Mode */
  toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem(
      'dark',
      document.body.classList.contains('dark') ? '1' : '0'
    );
  }
}
