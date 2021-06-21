import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { HttpServiceAuth } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-claim-buy',
  templateUrl: './claim-buy.component.html',
  styleUrls: ['./claim-buy.component.scss', '../../page.scss'],
})
export class ClaimBuyComponent implements OnInit {
  private __ngContext__: any;
  public uploaded: string[] = [];
  public amount: string | undefined;
  public transactionHash: string | undefined;

  @ViewChild('files') filesInput: ElementRef | undefined;

  constructor(
    private alertsStoreService: AlertsStoreService,
    private httpServiceAuth: HttpServiceAuth
  ) {}

  ngOnInit(): void {
    this.__ngContext__[0].querySelector('.page-title').textContent =
      'Claim & Buy';
  }

  getURL(img: string): string {
    return 'http://localhost:3000/uploads/' + img;
  }

  submit(): void {
    this.httpServiceAuth
      .requestMoney({
        amount: this.amount,
        transactionHash: this.transactionHash,
        proof: this.uploaded,
      })
      .subscribe((response: iHttpResponse) => {
        console.log(response);
        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${response.success ? 'success' : 'error'}`,
          show: true,
        });
      });
  }

  upload(e: Event): void {
    let formData = new FormData();
    let input: HTMLInputElement = e.target as HTMLInputElement;
    let files: FileList | null = input.files;

    if (files != null) {
      Array.from(files).forEach((file: File) => formData.append('files', file));

      this.httpServiceAuth
        .upload(formData)
        .subscribe((response: iHttpResponse) => {
          if (response.data != null)
            this.uploaded = [...this.uploaded, ...response.data];
          if (this.filesInput != undefined)
            this.filesInput.nativeElement.value = '';

          this.alertsStoreService.setAlert({
            text: response.message,
            type: 'info',
            show: true,
          });
        });
    }
  }
}
