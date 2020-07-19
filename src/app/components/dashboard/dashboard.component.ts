import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../models/Article'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  article: Article = {
    title: '', 
    body: ''
  };
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getNewestArticle().subscribe(article => {
      this.article = article
    })
  }

}
