import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PdfPage implements OnInit {

  @Input() safeUrl;


  constructor() {
  }

  async ngOnInit() {
    const urlEncoded = encodeURI(this.safeUrl.changingThisBreaksApplicationSecurit);
  }


}
