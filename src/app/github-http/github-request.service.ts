import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GithubRequestService {
  constructor(private http: HttpClient) {}

  //Get my GitHub user details
  getGitHubInfo(): Observable<any> {
    return this.http.get(
      'https://api.github.com/users/danjoki?access_token=' + environment.apiKey
    );
  }

  //Get My Repo
  getMyGitHubRepos(): Observable<any> {
    return this.http.get('https://api.github.com/users/danjoki/repos');
  }
}
