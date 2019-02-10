import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
declare let com: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private app_service: AppService) {}

  ngOnInit() {
    // const conference = new com.mind.Conference(
    //   'https://api.mind.com/00e1db72-c57d-478c-88be-3533d43c8b34/' +
    //     'conferenceId'
    // );
  }

  // onClick() {
  //   this.app_service.createConference('any').subscribe(response => {
  //     const conferenceId = response.id;
  //     const conference = new com.mind.Conference(
  //       'https://api.mind.com/00e1db72-c57d-478c-88be-3533d43c8b34/' +
  //         conferenceId
  //     );
  //
  //     this.app_service
  //       .createParticipant(conferenceId, 'name')
  //       .subscribe(participant => {
  //         conference.join(participant.token).then(me => {
  //           // debugger;
  //           this.videoPlayer.nativeElement.srcObject = conference.getMediaStream(
  //             { video: true, audio: true },
  //             com.mind.ConferenceLayout.MOSAIC
  //           );
  //           navigator.mediaDevices
  //             .getUserMedia({ video: true, audio: true })
  //             .then(function(stream) {
  //               me.setMediaStream(stream);
  //             })
  //             .catch(function(error) {
  //               alert("Can't get access to camera and microphone: " + error);
  //             });
  //           conference.startRecording();
  //         });
  //       });
  //   });
  // }
}
