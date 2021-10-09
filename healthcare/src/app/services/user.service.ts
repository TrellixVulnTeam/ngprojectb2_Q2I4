import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demographics, Users } from 'src/model/tabletypes';
import { map } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private SECRET_KEY = 'SECRET';
  constructor(private http: HttpClient, private _router: Router) {}
  private baseUrl = 'http://localhost:3004/users';
  private userDemographicUrl = 'http://localhost:3004/demographics';

  login(username: string, password: string) {
    return this.http.get(`${this.baseUrl}?email=${username}`).pipe(
      map((data: Users[]) => {
        let userData: Users;
        if (data.length > 0) {
          for (userData of data) {
            if (bcrypt.compareSync(password, userData.password)) {
              //const token = jwt.sign({username}, this.SECRET_KEY)
              localStorage.removeItem('user');
              localStorage.setItem('user', JSON.stringify(userData));
              return true;
            }
          }
        }
        return false;
      })
    );
  }

  registerUser(data: Users) : Observable<Users> {
    // const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(data.password, 10);
    let date = new Date();
    let userData: Users = new Users();
    userData.username = "abhay";
    userData.password = pass;
    userData.role = data.role;
    userData.email = data.email;
    userData.createdDate = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
    return this.http.post<Users>(this.baseUrl, userData);
  }

  createUserDemographics(demographicData: Demographics){
    return this.http.post(this.userDemographicUrl, demographicData);
  }

  getUserDetails(): Users | null {
    console.log(JSON.parse(localStorage.getItem('user')));
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }
}
