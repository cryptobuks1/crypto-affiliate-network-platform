import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-buy',
  templateUrl: './claim-buy.component.html',
  styleUrls: ['./claim-buy.component.scss', '../../page.scss']
})
export class ClaimBuyComponent implements OnInit {
  private __ngContext__: any;

  constructor() {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent = 'Claim & Buy';
  }

}
