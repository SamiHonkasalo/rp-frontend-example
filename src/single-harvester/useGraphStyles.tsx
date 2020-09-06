import { useCallback } from 'react';
import { useTheme } from '@material-ui/core/styles';

const useGraphStyles = () => {
  const theme = useTheme();

  const getGraphStyles = useCallback(
    (themeMode: boolean): Highcharts.Options => {
      return {
        chart: {
          backgroundColor: theme.palette.background.paper,
        },
        colors: [theme.palette.primary.main],
        title: {
          style: {
            color: theme.palette.text.primary,
          },
        },
        xAxis: {
          labels: {
            style: {
              color: theme.palette.text.primary,
            },
          },
        },
        yAxis: {
          labels: {
            style: {
              color: theme.palette.text.primary,
            },
          },
          title: {
            style: {
              color: theme.palette.text.primary,
            },
          },
        },
        rangeSelector: {
          labelStyle: {
            color: theme.palette.text.primary,
          },
        },
        navigator: {
          handles: {
            backgroundColor: themeMode ? '#666' : '#f2f2f2',
            borderColor: themeMode ? '#AAA' : '#999999',
          },
          outlineColor: '#CCC',
          maskFill: themeMode
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(102,133,194,0.3)',
          series: {
            color: theme.palette.primary.main,
            lineColor: theme.palette.primary.dark,
          },
          xAxis: {
            gridLineColor: themeMode ? '#505053' : '#e6e6e6',
          },
        },
        scrollbar: {
          barBackgroundColor: themeMode ? '#808083' : '#ccc',
          barBorderColor: themeMode ? '#808083' : '#ccc',
          buttonArrowColor: themeMode ? '#CCC' : '#333',
          buttonBackgroundColor: themeMode ? '#606063' : '#e6e6e6',
          buttonBorderColor: themeMode ? '#606063' : '#ccc',
          rifleColor: themeMode ? '#FFF' : '#333',
          trackBackgroundColor: themeMode ? '#404043' : '#f2f2f2',
          trackBorderColor: themeMode ? '#404043' : '#f2f2f2',
        },
      };
    },
    [
      theme.palette.background.paper,
      theme.palette.primary.dark,
      theme.palette.primary.main,
      theme.palette.text.primary,
    ]
  );

  return getGraphStyles;
};

export default useGraphStyles;
