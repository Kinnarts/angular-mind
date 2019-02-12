import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
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
  @Input() editedTarget: any;

  @Output() onEditClick = new EventEmitter<{ participant: any; event: any }>();
  @Output() onEditKey = new EventEmitter<{ event: any }>();
}
