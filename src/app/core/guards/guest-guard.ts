import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn } from '@angular/router';

export const guestGuard: CanMatchFn = (route, segments) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return localStorage.getItem('userToken') === null;
  }

  // وقت الـ SSR (على السيرفر) مفيش localStorage خالص، فبنسيبها تعدي
  // كـ guest افتراضيًا؛ الـ client هيصحح الحالة لما يشتغل في المتصفح.
  return true;
};
