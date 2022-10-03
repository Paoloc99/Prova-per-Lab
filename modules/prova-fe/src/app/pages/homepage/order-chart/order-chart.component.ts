import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { graphic } from 'echarts';


@Component({
  selector: 'app-order-chart',
  styleUrls: ['./order-chart.component.scss'],
  templateUrl: './order-chart.component.html',
})
export class OrderChartComponent implements OnDestroy, OnChanges {

  @Input()
  ordersChartData !: OrdersChart;

  private alive = true;

  echartsIntance: any;
  option: any;
  eTheme: any = {
    axisFontSize: "16",
    axisLineColor: "#e4e9f2",
    axisTextColor: "#8f9bb3",
    firstAreaGradFrom: "#edf1f7",
    firstAreaGradTo: "#edf1f7",
    firstShadowLineDarkBg: "rgba(0, 0, 0, 0)",
    itemBorderColor: "#3366ff",
    lineStyle: "solid",
    lineWidth: "4",
    secondAreaGradFrom: "rgba(51, 102, 255, 0.2)",
    secondAreaGradTo: "rgba(51, 102, 255, 0)",
    secondLineGradFrom: "#007bff",
    secondLineGradTo: "#007bff",
    secondShadowLineDarkBg: "rgba(0, 0, 0, 0)",
    thirdAreaGradFrom: "rgba(0, 214, 143, 0.2)",
    thirdAreaGradTo: "rgba(0, 214, 143, 0)",
    thirdLineGradFrom: "#48c774",
    thirdLineGradTo: "#2ce69b",
    thirdShadowLineDarkBg: "rgba(0, 0, 0, 0)",
    tooltipBg: "#ffffff",
    tooltipBorderColor: "#f7f9fc",
    tooltipExtraCss: "border-radius: 10px; padding: 8px 24px;",
    tooltipFontSize: "20",
    tooltipFontWeight: "normal",
    tooltipLineColor: "rgba(0, 0, 0, 0)",
    tooltipLineWidth: "0",
    tooltipTextColor: "#1a2138",
    yAxisSplitLine: "#edf1f7",
  };

  constructor() {
    this.setOptions(this.eTheme);
  }

  ngOnChanges(): void {
    if (this.option) {
      this.updateOrdersChartOptions(this.ordersChartData2);
    }
  }


  public ordersChartData2 = {
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

  

  setOptions(eTheme: any) {
    this.option = {
      grid: {
        left: 40,
        top: 20,
        right: 0,
        bottom: 40,
      },
     
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: eTheme.tooltipLineColor,
            width: eTheme.tooltipLineWidth,
          },
        },
        textStyle: {
          color: eTheme.tooltipTextColor,
          fontSize: eTheme.tooltipFontSize,
          fontWeight: eTheme.tooltipFontWeight,
        },
        position: 'top',
        backgroundColor: eTheme.tooltipBg,
        borderColor: eTheme.tooltipBorderColor,
        borderWidth: 1,
        formatter: (params: any) => {
          return Math.round(parseInt(params.value, 10));
        },
        extraCssText: eTheme.tooltipExtraCss,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        offset: 5,
        data: [],
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: eTheme.axisTextColor,
          fontSize: eTheme.axisFontSize,
        },
        axisLine: {
          lineStyle: {
            color: eTheme.axisLineColor,
            width: '2',
          },
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: eTheme.axisLineColor,
            width: '1',
          },
        },
        axisLabel: {
          color: eTheme.axisTextColor,
          fontSize: eTheme.axisFontSize,
        },
        axisTick: {
          show: false,
        },
        splitLine: {

          lineStyle: {
            color: eTheme.yAxisSplitLine,
            width: '1',
          },
        },
      },
      series: [
        this.getFirstLine(),
        this.getSecondLine(),
        this.getThirdLine(),
      ],
    };
  }

  getFirstLine() {
    return {
      type: 'line',
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        normal: {
          opacity: 0,
        },
        emphasis: {
          borderColor: 'red',
          borderWidth: 2,
          opacity: 0,
        },
      },
      lineStyle: {
        normal: {
          width: 0,
        },
      },
      areaStyle: {
        normal: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: this.eTheme.firstAreaGradFrom,
          }, {
            offset: 1,
            color: this.eTheme.firstAreaGradTo,
          }]),
          opacity: 1,
        },
      },
      data: [],
    };
  }

  getSecondLine() {
    return {
      type: 'line',
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        normal: {
          opacity: 0,
        },
        emphasis: {
          color: '#ffffff',
          borderColor: this.eTheme.itemBorderColor,
          borderWidth: 2,
          opacity: 1,
        },
      },
      lineStyle: {
        normal: {
          width: this.eTheme.lineWidth,
          type: this.eTheme.lineStyle,
           color: new graphic.LinearGradient(0, 0, 0, 1, [{
             offset: 0,
             color: this.eTheme.secondLineGradFrom,
           }, {
             offset: 1,
             color: this.eTheme.secondLineGradTo,
           }]),
        },
      },
      areaStyle: {
         normal: {
           color: new graphic.LinearGradient(0, 0, 0, 1, [{
             offset: 0,
             color: this.eTheme.secondAreaGradFrom,
           }, {
             offset: 1,
             color: this.eTheme.secondAreaGradTo,
           }]),
         }, 
      },
      data: [],
    };
  }

  getThirdLine() {
    return {
      type: 'line',
      smooth: true,
      symbolSize: 20,
      itemStyle: {
        normal: {
          opacity: 0,
        },
        emphasis: {
          color: '#ffffff',
          borderColor: this.eTheme.itemBorderColor,
          borderWidth: 2,
          opacity: 1,
        },
      },
      lineStyle: {
        normal: {
          width: this.eTheme.lineWidth,
          type: this.eTheme.lineStyle,
           color: new graphic.LinearGradient(0, 0, 0, 1, [{
             offset: 0,
             color: this.eTheme.thirdLineGradFrom,
           }, {
             offset: 1,
             color: this.eTheme.thirdLineGradTo,
           }]),
        },
      },
      areaStyle: {
        normal: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: this.eTheme.thirdAreaGradFrom,
          }, {
            offset: 1,
            color: this.eTheme.thirdAreaGradTo,
          }]),
        },
      },
      data: [],
    };
  }

  updateOrdersChartOptions(ordersChartData: OrdersChart) {
    const options = this.option;
    const series = this.getNewSeries(options.series, ordersChartData.linesData);
    const xAxis = this.getNewXAxis(options.xAxis, ordersChartData.chartLabel);

    this.option = {
      ...options,
      xAxis,
      series,
    };
  }

  getNewSeries(series: any, linesData: number[][]) {
    return series.map((line: any, index: any) => {
      return {
        ...line,
        data: linesData[index],
      };
    });
  }

  getNewXAxis(xAxis: any, chartLabel: string[]) {
    return {
      ...xAxis,
      data: chartLabel,
    };
  }

  onChartInit(echarts: any) {
    this.echartsIntance = echarts;
  }

  resizeChart() {
    if (this.echartsIntance) {
      // Fix recalculation chart size
      // TODO: investigate more deeply
      setTimeout(() => {
        this.echartsIntance.resize();
      }, 0);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

export interface OrdersChart {
  chartLabel: string[];
  linesData: number[][];
}

export abstract class OrdersChartData {
  abstract getOrdersChartData(period: string): OrdersChart;
}
