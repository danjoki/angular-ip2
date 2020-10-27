import { Component, OnInit } from '@angular/core';
import { GithubRequestService } from '../github-http/github-request.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;

  constructor(private gitHubRequest: GithubRequestService) {}

  ngOnInit(): void {
    this.gitHubRequest.gitHubUsersRequest;
    this.user = this.gitHubRequest.user;
  }
}
