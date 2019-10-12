import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class DataService {
  private codeSource = new BehaviorSubject("Empty code");
  currentCode = this.codeSource.asObservable();
  codigo: string;

  constructor() {}

  changeCode(code: string) {
    this.codeSource.next(code);
    this.codigo += code;
  }
}
