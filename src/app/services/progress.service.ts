/*
import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {AuthService} from "../admin/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private userProgressMap = new Map<string, number>();
  private readonly USER_PROGRESS_STORAGE_KEY = 'userProgressMap';

  constructor(private authService: AuthService) {
    const storedData = localStorage.getItem(this.USER_PROGRESS_STORAGE_KEY);
    if (storedData) {
      this.userProgressMap = new Map(JSON.parse(storedData));
    }
    this.authService.user$.subscribe(user => {
      if (user) {
        const userId = user.uid;
        if (this.userProgressMap.has(userId)) {
          const progress = this.userProgressMap.get(userId);
          this.authService.setToken(progress.toString());
        } else {
          this.userProgressMap.set(userId, 0);
          this.authService.setToken('0');
        }
      }
    });
  }

  public setProgress(progress: number): void {
    const userId = this.authService.user$.getValue().uid;
    this.userProgressMap.set(userId, progress);
    localStorage.setItem(this.USER_PROGRESS_STORAGE_KEY, JSON.stringify([...this.userProgressMap.entries()]));
    this.authService.setToken(progress.toString());
  }

  public getProgress(): Observable<number> {
    return this.authService.getToken().asObservable().pipe(
      map(token => {
        const progress = parseInt(token);
        if (isNaN(progress)) {
          return 0;
        }
        return progress;
      })
    );
  }
}
*/
