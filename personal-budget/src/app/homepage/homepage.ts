import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero/hero';
import { Article } from '../article/article';
import { HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [CommonModule, Hero, Article, HttpClientModule],
  template: `
    <pb-hero></pb-hero>
    <main class="center" id="main">
      <div class="page-area">
        <ng-container *ngFor="let a of articles">
          <pb-article [Title]="a.title" [Content]="a.content"></pb-article>
        </ng-container>

        <pb-article [Title]="'Chart'" [Content]="''">
          <div extra>
            <h1>Diagram</h1>
            <p><canvas #myChart width="400" height="400"></canvas></p>
          </div>
        </pb-article>
      </div>
    </main>
  `,
  styles: [],
})
export class Homepage implements OnInit, AfterViewInit, OnDestroy {
  articles = [
    {
      title: 'Stay on track',
      content:
        'Do you know where you are spending your money? If you really stop to track it down, you would get surprised! Proper budget management depends on real data... and this app will help you with that!',
    },
    {
      title: 'Alerts',
      content:
        'What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.',
    },
    {
      title: 'Results',
      content:
        'People who stick to a financial plan, budgeting every expense, get out of debt faster! Also, they to live happier lives... since they expend without guilt or fear... because they know it is all good and accounted for.',
    },
    {
      title: 'Free',
      content: 'This app is free!!! And you are the only one holding your data!',
    },
    {
      title: 'Stay on track',
      content:
        'Do you know where you are spending your money? If you really stop to track it down, you would get surprised! Proper budget management depends on real data... and this app will help you with that!',
    },
    {
      title: 'Alerts',
      content:
        'What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.',
    },
  ];

  constructor(private http: HttpClient) {}

  public dataSource: { datasets: { data: number[]; backgroundColor: string[] }[]; labels: string[] } = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19'],
      },
    ],
    labels: [] as string[],
  };
  @ViewChild('myChart', { static: false }) myChart?: ElementRef<HTMLCanvasElement>;

  // instance holder so we can destroy previous chart before creating a new one
  private chart: any = null;

  // flag in case data arrives before view initialization
  private pendingCreate = false;

  ngOnInit(): void {
    // register Chart.js components once
    Chart.register(...registerables);

    this.http.get('http://localhost:3000/budget').subscribe({
      next: (res: any) => {
        // server returns { myBudget: [...] } but some examples use res.data.myBudget
        const entries = (res && (res.data?.myBudget || res.myBudget)) || [];

        // populate datasource arrays (avoid recreating chart inside loop)
        entries.forEach((item: any) => {
          this.dataSource.datasets[0].data.push(item.budget);
          this.dataSource.labels.push(item.title);
        });

        // try to create chart now; if the view isn't ready set a pending flag
        if (this.myChart && this.myChart.nativeElement) {
          this.createChart();
        } else {
          this.pendingCreate = true;
        }
      },
      error: (err) => {
        console.error('Failed to load budget data', err);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.pendingCreate) {
      this.createChart();
      this.pendingCreate = false;
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      try { this.chart.destroy(); } catch (e) { /* ignore */ }
      this.chart = null;
    }
  }

  createChart() {
    const canvas = this.myChart?.nativeElement;
    if (!canvas) {
      console.warn('Chart canvas not available');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // destroy previous chart instance if present
    if (this.chart) {
      try { this.chart.destroy(); } catch (e) { /* continue */ }
      this.chart = null;
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }
}
