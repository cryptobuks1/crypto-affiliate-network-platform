import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';
import { AlertsStoreService } from 'src/app/Store/alerts-store.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-admin-announcements',
  templateUrl: './admin-announcements.component.html',
  styleUrls: ['./admin-announcements.component.scss']
})
export class AdminAnnouncementsComponent implements OnInit {
  public Editor: any = ClassicEditor;
  public announcement: any = {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    backgroundColor: '#333',
    textColor: '#fff',
    active: false
  };

  public store: any[] = [];

  constructor(
    private alertsStoreService: AlertsStoreService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  save(): void {
    this.adminService.setAnnouncement(this.announcement)
      .subscribe((response: iHttpResponse) => {
        this.alertsStoreService.setAlert({
          text: response.message,
          type: `${response.success ? 'success' : 'error'}`,
          show: true
        });
      });
  }

  fetchAnnouncements(): void {
    this.adminService.getAnnouncements().subscribe((response: iHttpResponse) => {
      if (response.success) {
        this.announcement = response.data.active;
        this.store = response.data.store;
      }
    });
  }

  use(s: any): void {
    this.announcement = s;
  }
}
