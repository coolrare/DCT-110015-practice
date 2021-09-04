import { Observable } from 'rxjs';
import { Article } from './../interfaces/article';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  displayArticles = false;
  articles: Article[];

  articles$: Observable<Article[]> = this.postService.getArticles()
    .pipe(
      map(result => result.articles)
    );

  constructor(private postService: PostService) { }

  ngOnInit(): void {

    // this.postService.getArticles().subscribe(result => {
    //   console.log(result);
    //   this.articles = result.articles;
    // });

  }

}
