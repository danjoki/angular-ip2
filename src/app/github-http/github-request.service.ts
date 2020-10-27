import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import { Repositories } from '../repositories';

@Injectable({
  providedIn: 'root',
})
export class GithubRequestService {
  user: User;
  repos: Repositories;
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

  //Get my GitHub user details using Promise
  gitHubUsersRequest() {
    interface UserApi {
      name: String;
      company: String;
      blog: String;
      location: String;
      email: String;
      bio: String;
      twitter_username: String;
      public_repos: number;
      followers: number;
      created_at: Date;
      updated_at: Date;
      avatar_url: String;
    }
    //The User Promise
    let gitHubUserPromise = new Promise((success, failed) => {
      this.http
        .get<UserApi>(environment.gitHubUserUrl + environment.apiKey)
        .toPromise()
        .then(
          (response) => {
            this.user.name = response.name;
            this.user.company = response.company;
            this.user.blog = response.blog;
            this.user.location = response.location;
            this.user.email = response.email;
            this.user.bio = response.bio;
            this.user.twitter_username = response.twitter_username;
            this.user.public_repos = response.public_repos;
            this.user.followers = response.followers;
            this.user.created_at = response.created_at;
            this.user.updated_at = response.updated_at;
            this.user.avatar_url = response.avatar_url;
            success();
          },
          (error) => {
            this.user.name = '';
            this.user.company = '';
            this.user.blog = '';
            this.user.location = '';
            this.user.email = '';
            this.user.bio = '';
            this.user.twitter_username = '';
            this.user.public_repos = 0;
            this.user.followers = 0;
            this.user.created_at = new Date();
            this.user.updated_at = new Date();
            this.user.avatar_url = '';
            failed(error);
          }
        );
    });
    return gitHubUserPromise;
  }

  //Get My Repo using Promise
  gitHubReposRequest() {
    interface ReposApi {
      name: String;
      fullName: String;
      accessIsPrivate: boolean;
      owner: String;
      htmlUrl: String;
      description: String;
      url: String;
      size: number;
      disabled: boolean;
      archived: boolean;
    }
    //The Repos Promise
    let gitHubReposPromise = new Promise((success, failed) => {
      this.http
        .get<ReposApi>(environment.gitHubReposUrl)
        .toPromise()
        .then(
          (response) => {
            this.repos.name = response.name;
            this.repos.fullName = response.fullName;
            this.repos.accessIsPrivate = response.accessIsPrivate;
            this.repos.owner = response.owner;
            this.repos.htmlUrl = response.htmlUrl;
            this.repos.description = response.description;
            this.repos.url = response.url;
            this.repos.size = response.size;
            this.repos.disabled = response.disabled;
            this.repos.archived = response.archived;
            success();
          },
          (error) => {
            this.repos.name = 'Error';
            this.repos.fullName = 'Error';
            this.repos.accessIsPrivate = false;
            this.repos.owner = 'Error';
            this.repos.htmlUrl = 'Error';
            this.repos.description = 'Error';
            this.repos.url = 'Error';
            this.repos.size = 0;
            this.repos.disabled = false;
            this.repos.archived = false;
            failed(error);
          }
        );
    });
    return gitHubReposPromise;
  }
}
