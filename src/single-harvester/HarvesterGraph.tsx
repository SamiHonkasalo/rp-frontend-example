import React, { useState, useEffect } from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardHeader, CardContent } from '@material-ui/core';

interface Props {
  harvester: HarvesterType;
}

const HarvesterGraph = ({ harvester }: Props) => {
  const [options, setOptions] = useState<Highcharts.Options>();
  const [initialized, setInitialized] = useState(false);
  const [chart, setChart] = useState<Highcharts.Chart | undefined>();

  const { name, oilLevelHistory } = harvester;

  const chartCreated = (c: Highcharts.Chart) => {
    setChart(c);
  };

  // Set some initial options on mount and add the whole history at the start
  useEffect(() => {
    const seriesData = oilLevelHistory.map((o) => ({
      x: o.time.getTime(),
      y: o.value,
    }));
    // Sort by date
    seriesData.sort((a, b) => a.x - b.x);
    const initialOptions: Highcharts.Options = {
      title: {
        text: `${name} oil level`,
      },
      series: [{ data: seriesData, type: 'line', name: 'Oil level' }],
      rangeSelector: {
        buttons: [
          {
            count: 1,
            type: 'minute',
            text: '1M',
          },
          {
            count: 5,
            type: 'minute',
            text: '5M',
          },
          {
            type: 'all',
            text: 'All',
          },
        ],
        inputEnabled: false,
        selected: 2,
      },
      time: {
        useUTC: false,
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: 'Oil level - %',
        },
      },
    };
    setOptions(initialOptions);
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update graph data when oil level history changes by adding a point to the series
  // Adding a single point is faster and better for performance, compared to updating the whole series
  useEffect(() => {
    if (initialized && chart && chart.series[0] && oilLevelHistory[0]) {
      const newestData = oilLevelHistory[0];
      const point = { x: newestData.time.getTime(), y: newestData.value };
      chart.series[0].addPoint(point);
    }
  }, [chart, initialized, oilLevelHistory]);

  return initialized ? (
    <Card>
      <CardHeader title="Oil level" />
      <CardContent>
        <HighchartsReact
          constructorType="stockChart"
          highcharts={Highcharts}
          options={options}
          callback={chartCreated}
          allowChartUpdate={false}
        />
      </CardContent>
    </Card>
  ) : (
    <p>No data</p>
  );
};

export default HarvesterGraph;
