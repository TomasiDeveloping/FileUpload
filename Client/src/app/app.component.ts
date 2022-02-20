import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserToCreate} from "./interfaces/userToCreate.model";
import {User} from "./interfaces/user.model";
import {UserService} from "./services/user.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isCreate: boolean = true;
  public name!: string;
  public address!: string;
  public user?: UserToCreate;
  public users: User[] = [];
  public response!: { dbPath: '' };
  private readonly imageUrl = environment.imageUrl;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  ngOnInit() {
    console.log(this.response)
  }

  public onCreate = () => {
    this.user = {
      name: this.name,
      address: this.address,
      imgPath: this.response.dbPath
    }

    this.userService.createUser(this.user).subscribe({
      next: (() => {
        this.getUsers();
        this.isCreate = false;
      }),
      error: (error) => {
        console.log(error);
      }
    });
  }

  public returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.address = '';
    this.response = {dbPath: ''};
  }

  public uploadFinished = (event: { dbPath: ""; }) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    return `${this.imageUrl}${serverPath}`;
  }

  private getUsers = () => {
    this.userService.getUsers().subscribe({
      next: ((res) => {
        this.users = res;
      }),
      error: (error) => {
        console.log(error);
      }
    });
  }
}
