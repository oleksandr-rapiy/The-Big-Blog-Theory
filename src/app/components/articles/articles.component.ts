import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/Article';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less']
})
export class ArticlesComponent implements OnInit {

  articles: Article[];
  showAddArticleForm: boolean = false;
  isAdmin: boolean  = false
  constructor(
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles;
    })

    this.authService.user.subscribe(user => {
      this.isAdmin = this.authService.isAdmin(user);
    })
  }

  removeArticle(article: Article) {
    this.articleService.removeArticle(article);
  }


  

}
