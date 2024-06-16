import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";

const cache = {};

export const cachingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const key = req.urlWithParams;

  if (cache[key]) {
    return of(cache[key]);
  }
  return next(req).pipe(
    tap((res) => {
      cache[key] = res;
    })
  )
}
