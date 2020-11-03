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
  constructor(private http: HttpClient) {
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      0,
      new Date(),
      new Date(),
      ''
    );
    this.repos = new Repositories(
      '',
      '',
      false,
      '',
      '',
      '',
      '',
      0,
      false,
      false
    );
  }

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
    let urlForUserDetailsAPI = environment.gitHubUserUrl + environment.apiKey;
    console.log('urlForUserDetailsAPI: ' + urlForUserDetailsAPI);
    let gitHubUserPromise = new Promise((resolve, reject) => {
      this.http
        .get<UserApi>(urlForUserDetailsAPI)
        .toPromise()
        .then(
          (response) => {
            // console.log('Name: ' + response.name);
            // console.log('company: ' + response.company);
            // console.log('blog: ' + response.blog);
            // console.log('location: ' + response.location);
            // console.log('email: ' + response.email);
            // console.log('bio: ' + response.bio);
            // console.log('twitter_username: ' + response.twitter_username);
            // console.log('public_repos: ' + response.public_repos);
            // console.log('followers: ' + response.followers);
            // console.log('created_at: ' + response.created_at);
            // console.log('updated_at: ' + response.updated_at);
            // console.log('avatar_url: ' + response.avatar_url);
            this.user.name = response.name;
            this.user.company = response.company;
            this.user.blog = response.blog;
            this.user.location = response.location;
            this.user.email = response.email;
            this.user.bio = response.bio;
            this.user.twitter_username = response.twitter_username;
            this.user.public_repos = response.public_repos;
            this.user.followers = response.followers;
            this.user.created_at = new Date(response.created_at);
            this.user.updated_at = new Date(response.updated_at);
            this.user.avatar_url = response.avatar_url;
            // console.log('Userrrr: ' + this.user.avatar_url);
            resolve();
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
            reject(error);
          }
        );
    });
    console.log('gitHubUserPromise: ' + JSON.stringify(gitHubUserPromise));
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
            console.log('Response: ' + JSON.stringify(response));
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

let formatDate = (date) => {
  return new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
};
