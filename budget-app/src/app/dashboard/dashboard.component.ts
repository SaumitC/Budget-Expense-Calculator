// dashboard.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Chart, ChartOptions } from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  totalBudget: number = 0;
  totalExpense: number = 0;
  remainingBudget: number = 0;
  selectedMonth: any = 'All';
  @ViewChild('budgetsBarChart')
  budgetsBarChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('budgetsPieChart')
  budgetsPieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyExpenseLineChart')
  monthlyExpenseLineChartCanvas!: ElementRef<HTMLCanvasElement>;
  private budgetsBarChart!: any;
  private budgetsPieChart: any;
  //private monthlyExpenseLineChart: Chart;

  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];

  // pie chart config
  pieChartOptions = {
    responsive: true,
  };
  pieChartLabels = [];
  pieChartData = [];
  pieChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  // line chart config
  lineChartOptions = {
    responsive: true,
  };
  lineChartLabels = [];
  lineChartData = [];
  lineChartType = 'line';
  lineChartLegend = true;
  lineChartPlugins = [];

  constructor(private dashboardService: DashboardService) {}
  ngOnDestroy(): void {
    this.budgetsBarChart?.destroy();
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.getMonthlyExpenseLineChart();
    this.getBudgetsPieChart();
    this.getBudgetsBarChart();
  }

  getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  getMonthlyExpenseLineChart() {
    this.dashboardService.getMonthlyExpense().subscribe(
      (data) => {
        this.lineChartData = data.data;
        this.lineChartLabels = data.data.map((d: any) => d.monthYear);
        const ctx = this.monthlyExpenseLineChartCanvas.nativeElement.getContext(
          '2d'
        );
        if (ctx) {
          this.budgetsBarChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.lineChartLabels,
              datasets: [
                {
                  label: 'Monthly Expense',
                  fill: false,
                  data: this.lineChartData.map((d: any) => d.amount),
                  backgroundColor: '#3cba9f',
                  borderWidth: 1,
                  borderColor: '#000000',
                },
              ],
            },
            //options:this.barChartOptions
          });
        }

      },
      (error) => {
        // Handle error, display an error message, etc.
        console.error('Failed to fetch chart data:', error);
      }
    );
  }
  getBudgetsPieChart() {
    this.dashboardService.getBudgetsPieChart().subscribe(
      (data: any) => {
        this.pieChartData = data.data;
        this.updateChart(data.data);
        console.log('Chart data fetched successfully:', data);
      },
      (error) => {
        // Handle error, display an error message, etc.
        console.error('Failed to fetch chart data:', error);
      }
    );
  }
  getBudgetsBarChart() {
    this.dashboardService.getBudgetsBarChart().subscribe(
      (data: any) => {
        const ctx = this.budgetsBarChartCanvas.nativeElement.getContext('2d');
        // Update chart data, labels, options, etc.
        data = data.data;
        this.barChartLabels = data.map((d: any) => d.title);
        this.totalBudget = data
          .map((d: any) => d.budget)
          .reduce((a: any, b: any) => a + b, 0);
        this.totalExpense = data
          .map((d: any) => d.amount)
          .reduce((a: any, b: any) => a + b, 0);
        this.remainingBudget = this.totalBudget - this.totalExpense;
        const expenses = data.map((d: any) => d.amount);
        const budgets = data.map((d: any) => d.budget);
        const datasets = [
          {
            label: 'Budgets',
            data: budgets,
            backgroundColor: '#3cba9f',
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            data: expenses,
            backgroundColor: '#c45850',
            borderWidth: 1,
          },
        ];
        if (ctx) {
          this.budgetsBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.barChartLabels,
              datasets: datasets,
            },
            //options:this.barChartOptions
          });
        }
        console.log('Chart data fetched successfully:', data);
      },
      (error) => {
        // Handle error, display an error message, etc.
        console.error('Failed to fetch chart data:', error);
      }
    );
  }
  onSelect(event: any) {
    console.log(this.selectedMonth);
    this.budgetsPieChart.destroy();
    if (this.selectedMonth === 'All') {
      this.updateChart(this.pieChartData);
      return;
    }
    const pieChartData = this.pieChartData;
    console.log(pieChartData);
    const selectedMonthData = pieChartData.filter(
      (d: any) => d.month === +this.selectedMonth
    );
    this.updateChart(selectedMonthData);
  }
  updateChart(data: any) {
    const pieChartLabels = data.map((d: any) => d.title);
    const pieChartData = data.map((d: any) => d.amount);
    const datasets = [
      {
        data: pieChartData,
        backgroundColor: data.map((d: any) => this.getRandomColor()),
        hoverBackgroundColor: data.map((d: any) => this.getRandomColor()),
      },
    ];
    const ctx = this.budgetsPieChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.budgetsPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: pieChartLabels,
          datasets: datasets,
        },
        //options:this.barChartOptions
      });
    }
  }
}
