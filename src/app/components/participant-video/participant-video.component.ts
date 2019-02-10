import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-participant-video',
  templateUrl: './participant-video.component.html',
  styleUrls: ['./participant-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantVideoComponent {
  @Input() participant: any;
  @Input() stream: any;
  @Input() muted: boolean;
}
