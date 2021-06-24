import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { serverAddr } from 'src/app/Services/settings';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.scss', '../page.scss'],
})
export class IdentityVerificationComponent implements OnInit {
  public uploaded: any[] | undefined = [];
  public myKycData: any | undefined;
  @ViewChild('files') filesInput: ElementRef | undefined;

  constructor(
    private alertsStoreService: AlertsStoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.myKyc();
  }

  getURL(img: string): string {
    return `${serverAddr}/uploads/${img}`;
  }

  myKyc(): void {
    this.authService.myKyc().subscribe((response: iHttpResponse) => {
      if (response.data !== null) {
        this.myKycData = response.data;
      }
    });
  }

  upload(e: Event): void {
    let formData = new FormData();
    let input: HTMLInputElement = e.target as HTMLInputElement;
    let files: FileList | null = input.files;

    if (files != null) {
      Array.from(files).forEach((file: File) => formData.append('files', file));

      this.authService.upload(formData).subscribe((response: iHttpResponse) => {
        if (response.success) {
          response.data.forEach((file: string) => {
            this.uploaded?.push({
              src: file,
              description: 'idCardFront',
            });
          });
        }

        this.alertsStoreService.setAlert({
          text: response.message,
          type: 'info',
          show: true,
        });
        if (this.filesInput !== undefined) {
          this.filesInput.nativeElement.value = '';
        }
      });
    }
  }

  submit(): void {
    this.authService
      .newKycRequest({ files: this.uploaded })
      .subscribe((response: iHttpResponse) => {
        if (response.success) {
          this.uploaded = [];
          this.myKyc();
        }

        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${response.success ? 'success' : 'error'}`,
          show: true,
        });
      });
  }

  strConv(str: string): string {
    if (str !== null) {
      let parts = str.match(/[A-Z][a-z]+|[0-9]+/g);
      if (parts !== null) return parts.join(' ');
    }

    return str;
  }
}
