import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  isVisible = false;

  private subscription?: Subscription;

  constructor(private readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subscription = this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isVisible = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
