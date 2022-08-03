import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePosts(post: Post) {
    this.http.post<{ name: string }>(
      'https://ng-complete-guide-f378b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      post,
      {
        observe: 'response'
      }
    )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    // searchParams = searchParams.append('key', 'value');
    // searchParams = searchParams.append('keyZZZ', 'valueZZZ');
    return this.http.get<{ [key: string]: Post }>(
      'https://ng-complete-guide-f378b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello!'}),
        // params: new HttpParams().set('print','pretty')
        params: searchParams
      }
    )
      .pipe(map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }), catchError(errRes => {
          //Sending to analytic server etc
          return throwError(errRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-f378b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
        responseType: 'text' //body type: json/text/blob
      }
    );
  }
}
