export class Repositories {
  constructor(
    public name: String,
    public fullName: String,
    public accessIsPrivate: boolean,
    public owner: String,
    public htmlUrl: String,
    public description: String,
    public url: String,
    public size: number,
    public disabled: boolean
  ) {}
}
