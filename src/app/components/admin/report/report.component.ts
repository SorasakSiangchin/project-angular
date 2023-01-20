import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Cs63Service } from 'src/app/service/cs63.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  myChart!: Chart;
  date = {
    dateStart: "2021/01/01",
    dateEnd: "2021/12/10"
    
  }
  data01: any = []
  constructor(private cs63: Cs63Service, private httpClient: HttpClient) {
    this.feedDataOrder()
  }

  ngOnInit(): void {
    
  }

  feedDataOrder() {
    const formData = new FormData()
    formData.append("dateStart", this.date.dateStart)
    formData.append("dateEnd", this.date.dateEnd)
    this.httpClient.post<any>(`${this.cs63.OrderX2Url}`,formData).subscribe(data => {
      for (let i = 0; i < 11; i++) {
        this.data01.push(data[i])
      }
      this.drawChart('bar')
      //this.data01.push(data.length)

    });
  }

  drawChart(type: any) {
    if (this.myChart != null) {
      this.myChart.destroy();
    }
    var ctx = 'myChart';
    this.myChart = new Chart(ctx, {
      type: type,
      data: {
        // แกน x
        labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [{
          label: '# of Votes',
          // แกน y
          data: this.data01,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  
}

