import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonName: string;
  @Input() buttonBackgroundImage: string;
  safeStyle: SafeStyle;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.safeStyle = this.sanitizer.bypassSecurityTrustStyle(`url(${this.buttonBackgroundImage})`);
  }

}
