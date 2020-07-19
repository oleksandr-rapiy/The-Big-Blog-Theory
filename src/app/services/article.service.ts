import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articlesCollection: AngularFirestoreCollection<Article>
  private articleDoc: AngularFirestoreDocument<Article>
  private articles: Observable<Article[]>

  constructor(
    private angularFirestore: AngularFirestore
  ) {
    this.articlesCollection = this.angularFirestore.collection('articles', ref => ref.orderBy('date', 'asc'));

    this.articles = this.getArticles();
  }

  getArticles(): Observable<Article[]> {
    // Articles with ID 
    return this.articlesCollection.snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data() as Article;
        data.id = a.payload.doc.id;
        data.date = data.date.toDate()
        return data;
      }))
    );


  }

  getNewestArticle(): Observable<Article> {
    return this.articles.pipe(map(articles => {
      return articles[0];
    }))
  }

  addArticle(article: Article) {
    this.articlesCollection.add(article);
  }


  removeArticle(article: Article) {
    this.articleDoc = this.angularFirestore.doc(`articles/${article.id}`);
    this.articleDoc.delete();
  }
}
