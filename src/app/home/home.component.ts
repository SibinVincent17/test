import { Component, OnInit, } from '@angular/core';
import { ListItem } from '../models/listitem.model';
import { QuestionsResponse } from '../models/questionsresponse.model';
import { AuthService } from '../services/auth.service';
import { DataService } from './../services/Data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  listQuestions: ListItem[] = [];
  questionResponse: QuestionsResponse;
  isLoggedIn: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
    this.dataService
      .listMyQuestions('http://forum.mashuptest.com/api/question')
      .subscribe((responseData: QuestionsResponse) => {
        this.listQuestions = responseData.data;
        this.questionResponse = responseData;
        console.log(this.questionResponse);
      });
  }

  onSearchFormSubmit(data) {
    this.dataService
      .searchQuestions(data.keyword)
      .subscribe((responseData: QuestionsResponse) => {
        this.listQuestions = responseData.data;
      });
  }

  fetchPaginatedResult(page: number) {
    this.dataService
      .listMyQuestions('http://forum.mashuptest.com/api/question?page=' + page)
      .subscribe((responseData: QuestionsResponse) => {
        this.listQuestions = responseData.data;
        this.questionResponse = responseData;
      });
  }
}