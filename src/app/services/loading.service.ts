import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  /** Whether the loading overlay should be visible. */
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

  /** Public observable for components to subscribe to. */
  readonly isLoading$: Observable<boolean> = this._isLoading$.asObservable();

  /** Minimum time (ms) that the loader should stay visible. */
  private readonly minDisplayDuration = 2500; // 2.5 seconds

  /** Timestamp when the loader was last shown. */
  private shownAt: number | null = null;

  show(): void {
    const now = performance.now();

    // If already visible, don't reset the timer
    if (this.shownAt !== null && this._isLoading$.value) {
      return;
    }

    this.shownAt = now;
    this._isLoading$.next(true);
  }

  hide(): void {
    if (this.shownAt === null) {
      this._isLoading$.next(false);
      return;
    }

    const elapsed = performance.now() - this.shownAt;
    const remaining = this.minDisplayDuration - elapsed;

    if (remaining > 0) {
      setTimeout(() => {
        this._isLoading$.next(false);
        this.shownAt = null;
      }, remaining);
    } else {
      this._isLoading$.next(false);
      this.shownAt = null;
    }
  }

  /** Helper to briefly show the loader for a fixed duration. */
  showFor(durationMs: number = this.minDisplayDuration): void {
    this.show();
    setTimeout(() => this.hide(), durationMs);
  }
}
