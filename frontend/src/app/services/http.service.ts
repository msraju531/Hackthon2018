import { Injectable } from '@angular/core';
import { config } from '../../providers/config';
import {
  Http,
  ConnectionBackend,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers
} from '@angular/http';
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpService extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private loaderService: LoaderService){
      super(backend, defaultOptions);
    }

    /**
    * Performs any type of http request.
    * @param url
    * @param options
    * @returns {Observable<Response>}
    */

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      return super.request(url, options);
    }

    /**
    * Performs a request with `get` http method.
    * @param url
    * @param options
    * @returns {Observable<>}
    */

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
      this.requestInterceptor();
      return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
    }

    getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
      return super.get(url, options);
    }

    /**
    * Performs a request with `post` http method.
    * @param url
    * @param body
    * @param options
    * @returns {Observable<>}
    */

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
      this.requestInterceptor();
      return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
    }

    /**
    * Performs a request with `put` http method.
    * @param url
    * @param body
    * @param options
    * @returns {Observable<>}
    */

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
      this.requestInterceptor();
      return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
    }

    /**
    * Performs a request with `delete` http method.
    * @param url
    * @param options
    * @returns {Observable<>}
    */

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
      this.requestInterceptor();
      return super.delete(this.getFullUrl(url), options)
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
    }


    /**
    * Request options.
    * @param options
    * @returns {RequestOptionsArgs}
    */

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
      if (options == null) {
        options = new RequestOptions();
      }
      if (options.headers == null) {
        options.headers = new Headers();
      }

      let userObj = sessionStorage.getItem('currentUser');
      userObj=JSON.parse(userObj);
      if(userObj){
        let Mytoken = userObj["token"];
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('x-auth-token', `${Mytoken}`);
      }else {
        options.headers.append('Content-Type', 'application/json');
      }
      return options;
    }

    /**
    * Build API url.
    * @param url
    * @returns {string}
    */

   private getFullUrl(url: string): string {
    return config.api_url + url;
  }

    /**
    * Request interceptor.
    */

    private requestInterceptor(): void {
      this.loaderService.show();
    }

    /**
    * Response interceptor.
    */

    private responseInterceptor(): void {
      // setTimeout(() => {
        this.loaderService.hide();
      // }, 500);
    }

    /**
    * Error handler.
    * @param error
    * @param caught
    * @returns {ErrorObservable}
    */

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
      return Observable.throw(error);
    }

    /**
    * onSubscribeSuccess
    * @param res
    */

    private onSubscribeSuccess(res: Response): void {
    }

    /**
    * onSubscribeError
    * @param error
    */

    private onSubscribeError(error: any): void {
      //Rules here
      if(error.status == 401) {
        sessionStorage.clear();
        location.reload();
      }
      
    }

    /**
    * onFinally
    */

    private onFinally(): void {
      this.responseInterceptor();
    }
  }