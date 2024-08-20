import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateUser().pipe(
    tap(isActive => {
      if (!isActive) {
        router.navigate(['/auth/login']);
      }
    })
  );
};
