import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero/hero';
import { Article } from '../article/article';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';   
import { DataService } from '../data.service';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  imports: [CommonModule, Hero, Article, Breadcrumbs],
  template: `
    <pb-hero></pb-hero>
    <main class="center" id="main">
     <pb-breadcrumbs></pb-breadcrumbs> 
      <div class="page-area">
        <ng-container *ngFor="let a of articles">
          <pb-article [Title]="a.title" [Content]="a.content"></pb-article>
        </ng-container>

        <pb-article [Title]="'D3.js Chart'" [Content]="''">
          <div extra>
            <h1>Budget Distribution</h1>
            <div #chartContainer class="d3-chart-container"></div>
          </div>
        </pb-article>
      </div>
    </main>
  `,
  styles: [`
    .d3-chart-container {
      width: 100%;
      min-width: 600px;
      height: 600px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f9f9f9;
      border-radius: 8px;
      margin: 20px 0;
      padding: 40px;
      box-sizing: border-box;
    }
    
    .d3-chart-container svg {
      border-radius: 8px;
    }
    
    .slice path {
      cursor: pointer;
      transition: opacity 0.3s;
    }
    
    .slice path:hover {
      opacity: 0.8;
    }
  `],
})
export class Homepage implements OnInit, AfterViewInit, OnDestroy {
  articles = [
    {
      title: 'Stay on track',
      content: 'Do you know where you are spending your money? If you really stop to track it down, you would get surprised! Proper budget management depends on real data... and this app will help you with that!',
    },
    {
      title: 'Alerts',
      content: 'What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.',
    },
    {
      title: 'Results',
      content: 'People who stick to a financial plan, budgeting every expense, get out of debt faster! Also, they to live happier lives... since they expend without guilt or fear... because they know it is all good and accounted for.',
    },
    {
      title: 'Free',
      content: 'This app is free!!! And you are the only one holding your data!',
    },
    {
      title: 'Stay on track',
      content: 'Do you know where you are spending your money? If you really stop to track it down, you would get surprised! Proper budget management depends on real data... and this app will help you with that!',
    },
    {
      title: 'Alerts',
      content: 'What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.',
    },
  ];

  constructor(private dataService: DataService) {}

  @ViewChild('chartContainer', { static: false }) chartContainer?: ElementRef<HTMLDivElement>;
  private chartData: any[] = [];
  private pendingRender = false;

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (res: any) => {
        const entries = res.myBudget || [];
        this.chartData = entries.map((item: any) => ({
          label: item.title,
          value: item.budget
        }));

        if (this.chartContainer && this.chartContainer.nativeElement) {
          this.renderD3Chart();
        } else {
          this.pendingRender = true;
        }
      },
      error: (err) => {
        console.error('Failed to load budget data:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.pendingRender && this.chartData.length > 0) {
      this.renderD3Chart();
      this.pendingRender = false;
    }
  }

  ngOnDestroy(): void {
    if (this.chartContainer) {
      d3.select(this.chartContainer.nativeElement).selectAll('*').remove();
    }
  }

  private renderD3Chart(): void {
    const container = this.chartContainer?.nativeElement;
    if (!container || !this.chartData.length) {
      return;
    }

    d3.select(container).selectAll('*').remove();

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chartGroup = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const colorMap: { [key: string]: string } = {
      'Eat out': '#ffcd56',
      'Rent': '#ff6384', 
      'Grocery': '#36a2eb'
    };

    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null)
      .padAngle(0.02);

    const arc = d3.arc<any>()
      .innerRadius(0)
      .outerRadius(radius);

    const outerArc = d3.arc<any>()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 1.1);

    const pieData = pie(this.chartData);

    const slices = chartGroup.selectAll('.slice')
      .data(pieData)
      .enter()
      .append('g')
      .attr('class', 'slice');

    slices.append('path')
      .attr('d', arc)
      .attr('fill', d => colorMap[d.data.label] || '#cccccc')
      .attr('stroke', 'white')
      .attr('stroke-width', 2);

    slices.append('text')
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        return `translate(${pos[0]}, ${pos[1]})`;
      })
      .attr('text-anchor', d => {
        const centroid = outerArc.centroid(d);
        return centroid[0] > 0 ? 'start' : 'end';
      })
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text(d => d.data.label);

    slices.append('text')
      .attr('transform', d => {
        const centroid = arc.centroid(d);
        const angle = d.endAngle - d.startAngle;
        if (angle < 0.3) return `translate(${centroid[0]}, ${centroid[1]}) scale(0)`;
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.7)')
      .text(d => `$${d.data.value}`);

    slices.append('polyline')
      .attr('points', d => {
        const centroid = arc.centroid(d);
        const outerCentroid = outerArc.centroid(d);
        const labelPos = outerArc.centroid(d);
        labelPos[0] = labelPos[0] > 0 ? labelPos[0] + 10 : labelPos[0] - 10;
        return [centroid, outerCentroid, labelPos].map(p => p.join(',')).join(' ');
      })
      .style('fill', 'none')
      .style('stroke', '#999')
      .style('stroke-width', 1)
      .style('opacity', 0.7);
  }
}