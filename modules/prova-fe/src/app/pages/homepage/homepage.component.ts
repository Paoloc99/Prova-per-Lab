import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BzLayoutService } from '@micegroup/voila2-blazing-ng';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit, OnDestroy {
	
	
  constructor(private layoutService: BzLayoutService) {}

	
  public ngAfterViewInit() : void  {
    this.layoutService.setHideFooter(false);
  }


  public ordersChartData = {
    chartLabel: this.getDataLabels(42, this.getWeeks()),
    linesData: [
      [
        220, 267, 326, 366, 389, 399,
        392, 371, 340, 304, 265, 227,
        191, 258, 240, 220, 200, 180, 97,
        109, 125, 144, 166, 189, 212,
        236, 259, 280, 300, 316, 329,
        338, 342, 339, 329, 312, 288,
        258, 221, 178, 128, 71,
      ],
      [
        232, 148, 113, 135, 162, 193,
        204, 190, 180, 173, 168, 164,
        162, 160, 159, 158, 159, 166,
        179, 195, 215, 336, 350, 370,
        400, 380, 360, 330, 300, 293,
        284, 273, 262, 251, 241, 234,
        232, 232, 232, 232, 232, 232,
      ],
      [
        100, 137, 202, 251, 288, 312,
        323, 324, 311, 288, 257, 222,
        187, 154, 170, 190, 200, 210, 61,
        58, 61, 69, 80, 96, 115, 137,
        161, 186, 210, 233, 254, 271,
        284, 293, 270, 247, 221, 207,
        187, 187, 187, 187, 187,
      ],
    ],
  };


  private getWeeks() {
    return [
      'Lun',
      'Mar',
      'Mer',
      'Gio',
      'Ven',
      'Sab',
      'Dom',
    ];
  }

  private getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }
  

option : EChartsOption = {
  xAxis: {
      type: 'category',
      data: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {color: '#007bff'},
  }]
};

ngOnDestroy() {
  this.layoutService.setHideFooter(true);
}

}

