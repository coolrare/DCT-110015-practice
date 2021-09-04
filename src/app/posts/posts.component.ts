import { Observable } from 'rxjs';
import { Article } from './../interfaces/article';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

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
      map(result => result.articles),
      shareReplay(1, 3000)
    );

  displayTime = 0;

  constructor(private postService: PostService) { }

  ngOnInit(): void {

    // this.postService.getArticles().subscribe(result => {
    //   console.log(result);
    //   this.articles = result.articles;
    // });

  }

  displayClick() {
    const cacheDuration = 3000;
    this.displayArticles = !this.displayArticles;

    const currentTime = (new Date()).getTime();

    if(currentTime - this.displayTime >= cacheDuration) {
      this.articles$ = this.postService.getArticles()
        .pipe(
          map(result => result.articles),
          shareReplay(1, cacheDuration)
        );
      this.displayTime = currentTime;
    }
  }

}
