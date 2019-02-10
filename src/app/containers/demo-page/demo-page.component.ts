import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})
export class DemoPageComponent implements OnInit {
  conferenceNames = [
    'Cassiopeia',
    'Andromeda',
    'Taurus',
    'Perseus',
    'Auriga',
    'Orion',
    'Hydra',
    'Cetus',
    'Hercules'
  ];

  constructor(private app_service: AppService) {}

  ngOnInit() {}

  onCreateClick() {
    this.app_service
      .createConference(
        this.conferenceNames[
          Math.floor(Math.random() * this.conferenceNames.length)
        ]
      )
      .subscribe(response => {
        if (response && response.id) {
          location.assign(location.pathname + '/' + response.id);
        } else {
          alert("Can't create conference");
        }
      });
  }
}
