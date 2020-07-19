import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../models/Article'

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.less']
})
export class AddArticleComponent implements OnInit {

  article: Article = {
    title: '',
    body: ''
  }
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
  }

  onSubmit({value, valid}: {value: Article, valid: boolean}) {
    value.date = new Date()
    this.articleService.addArticle(value);

    this.article = {
      title: '',
      body: ''
    }
  }
}
