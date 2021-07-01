import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { iHttpResponse } from 'src/app/Interfaces/http.interface';


@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  public showAnnouncement: boolean = true;
  public announcement: any | undefined;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.fetchAnnouncement();
  }

  fetchAnnouncement(): void {
    this.httpService.getAnnouncement().subscribe((response: iHttpResponse) => {
      if(response.success) {
        this.announcement = response.data;
      }
    });
  }
}
