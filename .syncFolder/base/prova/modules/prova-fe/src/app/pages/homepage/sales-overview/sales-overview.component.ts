import { Component, OnInit } from '@angular/core';
import { graphic } from 'echarts';
import { OrdersChart } from '../order-chart/order-chart.component';


@Component({
  selector: 'app-sales-overview',
  templateUrl: './sales-overview.component.html',
  styleUrls: ['./sales-overview.component.scss']
})
export class SalesOverviewComponent implements OnInit {

  public ordersChartData = {
    chartLabel: this.getDataLabels(42, ['05','08','10','11','12','15','20']),
    linesData: [
      [
        50,70,80,100,130,150, 130,
        125, 135, 140, 145, 155, 170,
        180, 175, 170, 190, 210, 240,
        300, 350, 400, 355, 345, 420,
        430, 440, 450, 460, 500, 550,
        600, 300, 290, 270, 250, 230,
        500, 400, 380, 520, 600
      ]
    ],
  };
  
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
  
  
  
    ngOnChanges(): void {
      if (this.option) {
        this.updateOrdersChartOptions(this.ordersChartData);
      }
    }
  
  
  
    ngOnInit(): void {
      this.setOptions(this.eTheme);
      this.updateOrdersChartOptions(this.ordersChartData);
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


    onChartInit(echarts: any) {
      this.echartsIntance = echarts;
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

    private getDataLabels(nPoints: number, labelsArray: string[]): string[] {
      const labelsArrayLength = labelsArray.length;
      const step = Math.round(nPoints / labelsArrayLength);
  
      return Array.from(Array(nPoints)).map((item, index) => {
        const dataIndex = Math.round(index / step);
  
        return index % step === 0 ? labelsArray[dataIndex] : '';
      });
    }
    
  }

  
