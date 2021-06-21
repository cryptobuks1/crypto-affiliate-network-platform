import { Injectable } from '@angular/core';

declare var VANTA: any;

@Injectable({
  providedIn: 'root',
})
export class VantaService {
  constructor() {}

  public initVanta(): void {
    VANTA.NET({
      el: '.form-container',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xffd700,
      backgroundColor: 0x252525,
    });
  }
}
