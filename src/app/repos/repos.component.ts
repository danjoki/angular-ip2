import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { GithubRequestService } from '../github-http/github-request.service';
import { Repositories } from '../repositories';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  repos: Repositories[];
  constructor(private gitHubRequest: GithubRequestService) {}

  ngOnInit() {
    this.gitHubRequest.getMyGitHubRepos();
    this.repos.push(this.gitHubRequest.repos);
  }
}
