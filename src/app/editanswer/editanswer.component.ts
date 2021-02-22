import { Component, OnInit, Output, Input, EventEmitter, } from '@angular/core';
import { DataService } from './../services/Data.service';
@Component({
  selector: 'app-editanswer',
  templateUrl: './editanswer.component.html',
  styleUrls: ['./editanswer.component.css'],
})
export class EditanswerComponent implements OnInit {
  @Input() answer: string;
  @Input() answerId: number;
  @Output() close = new EventEmitter();
  @Output() editted = new EventEmitter();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    console.log(this.answer);
  }

  onEditAnswerSubmit(data) {
    this.dataService
      .editAnswer(this.answerId, data.answer)
      .subscribe((response) => {
        this.editted.emit();
      });
  }

  onClose() {
    this.close.emit();
  }
}