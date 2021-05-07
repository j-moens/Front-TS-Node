import { Injectable } from '@angular/core';
import{ServerService} from './server.service'
import {User} from '../Models/user.model';
import { Observable } from 'rxjs';
import{ map, catchError } from 'rxjs/operators';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  

  constructor(private server: ServerService, private router : Router) { 
    
  }

      addUsers(body: User):Observable <User[]>
      {

          
        // this.server.post('movies/actors/create/',body);
        // this.router.navigate(['actors']).then(()=>location.reload());


        return this.server.post<User>('movies/users/create/',body).pipe(
          map(res=> res.map((m: any) =>new User(m))),
          catchError(err=>
           {
             console.error(err);
             return[];
           } )
        );
       

    
  }

   

public getAll(): Observable<User[]>
{
  return this.server.get<User[]>('movies/users/').pipe(
    map(res => res.map((m: any) =>new User(m))),
    catchError(err=>
     {
       console.error(err);
       return[];
     } )
  );
}



public getOneById(id: number): Observable<User>
{
  return this.server.get<User>('movies/users/'+id).pipe(
    map(res => res.length > 0 ? new User(res[0]): new User({})),
    catchError(err=>
     {
       console.error(err);
       return[];
     } )
  );
}

public updateUser(user: User): Observable<User>

{
  return this.server.put<User>('movies/users/'+user.id, user).pipe(
    map(res => res.length > 0 ? new User(res[0]): new User({})),
    catchError(err=>
     {
       console.error(err);
       return[];
     } )
  );
}


public deleteUser(user: User): Observable<User[]>

{
  return this.server.delete<User>('movies/users/'+user.id).pipe(
    map(res => res.map((m: any) =>new User(m))),
    catchError(err=>
     {
       console.error(err);
       return[];
     } )
  );

}




}
