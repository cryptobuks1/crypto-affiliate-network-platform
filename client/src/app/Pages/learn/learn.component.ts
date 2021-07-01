import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AdminService } from 'src/app/Services/admin.service';
import { HttpService } from 'src/app/Services/http.service';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss', '../page.scss']
})
export class LearnComponent implements OnInit {
  public editing: boolean = false;
  public canEdit: boolean = false;
  public videos: any[] = [];

  constructor(
    private alertsStoreService: AlertsStoreService,
    private httpService: HttpService,
    private adminService: AdminService,
    private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isAdmin();
    this.fetchVideos();
  }

  isAdmin() {
    this.adminService.isAdmin().subscribe((response: iHttpResponse) => {
      this.canEdit = response.data;
    });
  }

  fetchVideos(): void {
    this.httpService.getVideos().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.videos = response.data;
      }
    });
  }

  getVideoUrl(code: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + code);
  }

  save(): void {
    this.editing = false;

    this.adminService.setVideos({ videos: this.videos }).subscribe((response: iHttpResponse) => {
      this.alertsStoreService.setAlert({
        text: response.message,
        type: `${response.success ? 'success' : 'error'}`,
        show: true
      });
    });
  }
}
