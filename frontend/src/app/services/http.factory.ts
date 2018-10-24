import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from "./http.service";
import { LoaderService } from './loader.service';

export function httpFactory(
  backend: XHRBackend,
  defaultOptions: RequestOptions, loaderService:LoaderService) {
    return new HttpService(backend, defaultOptions,loaderService) }