import { Component, OnInit } from '@angular/core';
import { ListItem } from '../models/listitem.model';
import { QuestionsResponse } from '../models/questionsresponse.model';
import { DataService } from './../services/Data.service';


@Component({
  selector: 'app-myanswers',
  templateUrl: './myanswers.component.html',
  styleUrls: ['./myanswers.component.css'],
})
export class MyanswersComponent implements OnInit {
  listQuestions: ListItem[] = [];
  isLoggedIn: boolean = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .listMyQuestions(
        'http://forum.mashuptest.com/api/question/answered-by-me'
      )
      .subscribe((responseData: QuestionsResponse) => {
        this.listQuestions = responseData.data;
      });
  }
}