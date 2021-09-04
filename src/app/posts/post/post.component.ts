import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from './../../interfaces/article';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  // article : Article;

  article$: Observable<Article>;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(result => {
    //   // console.log(result.get('id'));
    //   const id = result.get('id');
    //   this.postService.getArticle(id).subscribe(singleArticle => {
    //     this.article = singleArticle.article;
    //   });
    // });

    this.article$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.postService.getArticle(id)),
      map(singleArticle => singleArticle.article),
      shareReplay(1)
    );
  }

}
