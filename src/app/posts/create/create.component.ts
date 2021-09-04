import { Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

const requireAndLength10 = Validators.compose([Validators.required, Validators.minLength(10)]);

const requireAdnLength = (length: number) => {
  return Validators.compose([Validators.required, Validators.minLength(length)]);
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post = this.formBuilder.group({
    title: this.formBuilder.control('title', Validators.required),
    description: this.formBuilder.control('desc', requireAndLength10),
    body: this.formBuilder.control('body'),
    // body: this.formBuilder.control('body', requireAdnLength(100)),
    tags: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
      this.formBuilder.control('JavaScript')
    ])
  });

  get tags() {
    return this.post.get('tags') as FormArray;
  }

  get title() {
    return this.post.get('title');
  }

  get description() {
    return this.post.get('description');
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit(): void {
    // console.log(this.tags.controls);
    console.log(this.tags.value);
  }

  addTag(tag: string){
    this.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  createPost() {
    console.log(this.post.value);

    const data = { ...this.post.value, tagsList: [...this.post.value.tags] };
    delete data.tags;
    console.log(data);

    this.postService.createArticle(data).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
