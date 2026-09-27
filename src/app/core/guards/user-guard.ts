import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn } from '@angular/router';

export const userGuard: CanMatchFn = (route, segments) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return localStorage.getItem('userToken') !== null;
  }

  return false;
};
