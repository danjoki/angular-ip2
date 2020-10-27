import { StyleCompiler } from '@angular/compiler';

export class User {
  constructor(
    public name: String,
    public company: String,
    public blog: String,
    public location: String,
    public email: String,
    public bio: String,
    public twitter_username: String,
    public public_repos: number,
    public followers: number,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
