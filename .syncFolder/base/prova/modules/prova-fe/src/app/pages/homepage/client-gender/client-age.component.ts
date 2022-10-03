import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-client-age',
  templateUrl: './client-age.component.html',
  styleUrls: ['./client-age.component.scss']
})
export class ClientAgeComponent {

  option: EChartsOption = {

    tooltip: {

    },
    legend: {
      top: '5%',
      left: 'center'
    },

    series: [
      {
        name: 'Età',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'under 20', itemStyle: { color: '#007bff' } },
          { value: 735, name: 'over 30', itemStyle: { color: '#42cf7e' } },
          { value: 580, name: 'over 40', itemStyle: { color: '#EE6666' } },
          { value: 484, name: 'over 50', itemStyle: { color: '#FAC858' } }
        ]
      }
    ],

  };

}
