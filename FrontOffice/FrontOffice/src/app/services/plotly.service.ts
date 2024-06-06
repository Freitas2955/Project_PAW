import { Injectable } from '@angular/core';
declare let Plotly: any;
@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root'
})
export class PlotlyService {

  constructor() { }

  plotLine(title: string, divId: string, xData: any[], yData: number[]): void {
    const trace = {
      x: xData,
      y: yData,
      mode: 'lines+markers',
      type: 'scatter'
    };

    const layout = {
      title: title,
      xaxis: {
        title: 'Data'
      },
      yaxis: {
        title: 'Pontos Acumulados'
      },
      autosize: true 
    };

    Plotly.newPlot(divId, [trace], layout);
  }


  plotBar(title: string, divId: string, xData: string[], yData: number[]) {
    const trace = {
      x: xData,
      y: yData,
      type: 'bar'
    };

    const layout = {
      title: title
    };

    Plotly.newPlot(divId, [trace], layout);
  }
}