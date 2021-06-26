import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { HttpService } from 'src/app/Services/http.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { serverAddr } from 'src/app/Services/settings';

@Component({
  selector: 'app-claim-buy',
  templateUrl: './claim-buy.component.html',
  styleUrls: ['./claim-buy.component.scss'],
})
export class ClaimBuyComponent implements OnInit {
  public uploaded: string[] | undefined;
  public myRequests: any[] | undefined;
  public amount: number | undefined;
  public transactionHash: string | undefined;
  public loading: boolean = false;

  @ViewChild('files') filesInput: ElementRef | undefined;

  constructor(
    private httpService: HttpService,
    private alertsStoreService: AlertsStoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    window.document.title = 'BNBG | Claim & Buy';

    this.fetchRequests();
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
  }

  fetchRequests(): void {
    this.authService.myRequests().subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.myRequests = response.data;
      }
    });
  }

  submit(): void {
    if (this.transactionHash != undefined) {
      this.loading = true;

      this.httpService
        .validateHash(this.transactionHash)
        .subscribe((hashResult: any) => {
          if (parseInt(hashResult.result.status) === 1) {
            this.authService
              .requestMoney({
                amount: this.amount,
                transactionHash: this.transactionHash,
                proof: this.uploaded,
              })
              .subscribe((response: iHttpResponse) => {
                if (response.success) {
                  this.uploaded = [];
                  this.amount = 0;
                  this.transactionHash = undefined;
                  this.myRequests?.push(response.data);
                }

                this.alertsStoreService.setAlert({
                  text: response.message,
                  type: `${response.success ? 'success' : 'error'}`,
                  show: true,
                });
               this.loading = false;
              });
            this.loading = false;
          } else {
            this.alertsStoreService.setAlert({
              type: 'error',
              text: "please check the hash you've entered",
              show: true,
            });
            this.loading = false;
          }
        });
    }
  }

  upload(e: Event): void {
    let formData = new FormData();
    let input: HTMLInputElement = e.target as HTMLInputElement;
    let files: FileList | null = input.files;

    if (files != null) {
      Array.from(files).forEach((file: File) => formData.append('files', file));

      this.authService.upload(formData).subscribe((response: iHttpResponse) => {
        if (response.data !== null)
          this.uploaded =
            this.uploaded !== undefined
              ? [...this.uploaded, ...response.data]
              : [...response.data];

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
