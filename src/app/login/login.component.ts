import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, filter } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  redirectUrl = '';

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      console.log(queryParamMap.get('redirect'));
      this.redirectUrl = queryParamMap.get('redirect');
    });
  }

  login() {
    // this.loginService.login(this.user).subscribe(result => {
    //   localStorage.setItem('token', result.user.token);
    //   this.router.navigateByUrl('/');
    // });

    // this.loginService.login(this.user).subscribe({
    //   next: result => {
    //     localStorage.setItem('token', result.user.token);
    //     this.router.navigateByUrl('/');
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error);
    //     alert(error.error.body[0]);
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   }
    // });

    this.loginService
      .login(this.user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          alert(error.error.body[0]);
          return of({ user: { token: '' } });
          // return throwError(error);
        }),
        filter((result) => !!result.user.token)
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          localStorage.setItem('token', result.user.token);
          this.router.navigateByUrl(this.redirectUrl ?? '/');
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
