import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {
  }

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errMess => {
      this.error = errMess;
    })
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false
    }, error => {
      this.error = error.message;
    })
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData);
    console.log(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching=false;
      }, error => {
        this.error = error.message;
        this.isFetching=false;
      })
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.postService.fetchPosts().subscribe(posts => {
        this.loadedPosts = posts;
      })
    });
  }

  onHandleError() {
    this.error=null;
    this.isFetching=false;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
