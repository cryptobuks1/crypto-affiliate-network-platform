import { Injectable } from '@angular/core';

declare var VANTA: any;


@Injectable({
  providedIn: 'root'
})
export class VantaService {

  constructor() { }

  
  public initVanta(): void {
    VANTA.NET({
      el: ".form-container",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xFFD700,
      backgroundColor: 0x252525
    })
  }
}
