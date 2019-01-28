import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
declare var com: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mind on angular';
  app_id = '3392f844-9dbc-4251-b0ae-8a44efae95d1';

  @ViewChild('videoPlayer') videoPlayer: any;

  constructor(private app_service: AppService) {}

  onClick() {
    this.app_service.createConference(this.app_id).subscribe(response => {
      const conferenceId = response.id;
      const conference = new com.mind.Conference(
        'https://api.mind.com/00e1db72-c57d-478c-88be-3533d43c8b34/' +
          conferenceId
      );

      this.app_service
        .createParticipant(this.app_id, conferenceId)
        .subscribe(participant => {
          conference.join(participant.token).then(me => {
            this.videoPlayer.nativeElement.srcObject = conference.getMediaStream(
              { video: true, audio: true },
              com.mind.ConferenceLayout.MOSAIC
            );
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then(function(stream) {
                me.setMediaStream(stream);
              })
              .catch(function(error) {
                alert("Can't get access to camera and microphone: " + error);
              });
            conference.startRecording();
          });
        });
    });
  }
}
