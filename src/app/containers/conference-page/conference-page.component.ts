import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
declare let com: any;

@Component({
  selector: 'app-conference-page',
  templateUrl: './conference-page.component.html',
  styleUrls: ['./conference-page.component.scss']
})
export class ConferencePageComponent implements OnInit {
  participantNames = [
    'Zeus',
    'Hera',
    'Poseidon',
    'Ares',
    'Athena',
    'Apollo',
    'Artemis',
    'Hephaestus',
    'Aphrodite',
    'Hermes',
    'Dionysus',
    'Hades',
    'Hypnos',
    'Nike',
    'Janus',
    'Nemesis',
    'Iris',
    'Hecate',
    'Tyche'
  ];
  com = com;
  hideChat = true;
  recording = false;
  camera = true;
  microphone = true;
  volume = true;
  stream: any;
  conference: any;
  layout: null;
  edited = {
    target: null,
    contenteditable: null
  };

  private url = environment.APIEndpoint;
  private app_id = environment.app_id;

  @ViewChild('videoPlayer') videoPlayer: any;
  @ViewChild('messageText') messageText: ElementRef;

  constructor(private route: ActivatedRoute, private app_service: AppService) {}

  ngOnInit() {
    this.route.params.subscribe((params: ParamMap) => {
      const conferenceListener = new com.mind.ConferenceListener();
      conferenceListener.onConferenceEnded = () => {
        location.assign(location.hostname + '/demo');
      };
      this.conference = new this.com.mind.Conference(
        this.url + '/' + this.app_id + '/' + params['id'],
        conferenceListener
      );
      this.app_service
        .createParticipant(
          params['id'],
          this.participantNames[
            Math.floor(Math.random() * this.participantNames.length)
          ]
        )
        .subscribe(participant => {
          this.conference.join(participant.token).then(me => {
            this.updateStream();
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then(function(stream) {
                me.setMediaStream(stream);
              })
              .catch(function(error) {
                alert("Can't get access to camera and microphone: " + error);
              });
          });
        });
    });
  }

  setLayout(layout) {
    this.layout = layout;
    if (layout) {
      this.videoPlayer.nativeElement.srcObject = this.conference.getMediaStream(
        { video: true, audio: true },
        layout
      );
    }
  }

  toggleRecording() {
    this.recording = !this.recording;
    if (this.conference.isRecording()) {
      this.conference.stopRecording();
    } else {
      this.conference.startRecording();
    }
  }

  toggleCamera() {
    this.camera = !this.camera;
    this.updateStream();
  }

  toggleMicrophone() {
    this.microphone = !this.microphone;
    this.updateStream();
  }

  toggleVolume() {
    if (this.volume) {
      this.videoPlayer.nativeElement.volume = 0;
    } else {
      this.videoPlayer.nativeElement.volume = 1;
    }
    this.volume = !this.volume;
  }

  editNameOf(target, event) {
    event.stopPropagation();
    if (this.edited.target !== target) {
      if (this.edited.target != null) {
        this.saveEditedName();
      }
      this.edited.target = target;
      this.edited.contenteditable = event.target;
    }
  }

  saveEditedName(event?: any) {
    if (event.type === 'keydown' && event.which === 13) {
      event.preventDefault();
    }
    if (
      (event.type === 'click' ||
        (event.type === 'keydown' && event.which === 13)) &&
      this.edited.target != null
    ) {
      this.edited.target.setName(this.edited.contenteditable.textContent);
      this.edited.target = null;
      this.edited.contenteditable = null;
    }
  }

  onParticipantEditClick(event) {
    this.editNameOf(event.participant, event.event);
  }

  onParticipantEditKey(event) {
    this.saveEditedName(event);
  }

  sendMessage(event) {
    if (
      this.messageText.nativeElement.value.length > 0 &&
      (event.type === 'click' ||
        (event.type === 'keydown' && event.which === 13))
    ) {
      event.preventDefault();
      this.conference.sendMessage(this.messageText.nativeElement.value);
      this.messageText.nativeElement.value = '';
    }
  }

  updateStream() {
    if (this.camera || this.microphone) {
      navigator.mediaDevices
        .getUserMedia({ audio: this.microphone, video: this.camera })
        .then(stream => {
          if (this.stream) {
            this.stream.getTracks().forEach(track => {
              track.stop();
            });
          }
          this.stream = stream;
          this.conference.me.setMediaStream(stream);
        })
        .catch(error => {
          if (this.stream) {
            if (this.stream.getVideoTracks().length === 0) {
              this.camera = false;
            }
            if (this.stream.getAudioTracks().length === 0) {
              this.microphone = false;
            }
          } else {
            this.camera = false;
            this.microphone = false;
          }
        });
    } else {
      if (this.stream) {
        this.stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      this.stream = null;
      this.conference.me.setMediaStream(null);
    }
  }
}
