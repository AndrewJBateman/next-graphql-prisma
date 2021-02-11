import { Component } from '@angular/core';
import { NewsApiResponse } from "../interfaces/interfaces";

// services
import { NewsApiService } from '../providers/news-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data: any;

  constructor(private newsService: NewsApiService) {

    this.getCountryNews("us");
  }

  // subscribe from http service
	getCountryNews(countryCode: string): any {
    this.newsService.getNews('top-headlines?country=' + countryCode)
    .subscribe(
      (data: NewsApiResponse) => {
        this.data = data.articles;
      },
      (err) => {
        console.log('An error occured, error: ', err);
      }
    )
	}

}
