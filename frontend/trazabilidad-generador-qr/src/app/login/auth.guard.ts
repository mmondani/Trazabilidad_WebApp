import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user
    .pipe(
      map(user => {
        const isAuth = !!user;

        if (isAuth)
          return true;
        
        return router.createUrlTree(['/login'])
      })
    );
};
