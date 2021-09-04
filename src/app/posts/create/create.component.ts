import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post = this.formBuilder.group({
    title: this.formBuilder.control('title'),
    description: this.formBuilder.control('desc'),
    body: this.formBuilder.control('body'),
    tags: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
      this.formBuilder.control('JavaScript')
    ])
  });

  get tags() {
    return this.post.get('tags') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) { }

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
  }
}
