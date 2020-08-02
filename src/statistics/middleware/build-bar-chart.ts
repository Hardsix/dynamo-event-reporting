import _ from 'lodash';
import { Request, Response, combinePDFBuffers } from '../../common';
import { asyncMiddleware } from '../../common/async-middleware';
import { EventGroups } from '../../db/events';

const JSDOM = require('jsdom').JSDOM;
const jsdom = new JSDOM('<body><div id="container"></div></body>', { runScripts: 'dangerously' });
const window = jsdom.window;
const anychart = require('anychart')(window);
const anychartExport = require('anychart-nodejs')(anychart);

function buildIntervalSizeChart(eventGroups: EventGroups) {
  const eventCountsByGroup = _.mapValues(eventGroups, (events) => events.length);

  const eventsCountsBarData: [string, number][] = [];
  _.forOwn(eventCountsByGroup, (events, interval) => eventsCountsBarData.push([interval, events]));

  const eventCountsByGroupChart = anychart.bar(eventsCountsBarData);
  eventCountsByGroupChart.bounds(0, 0, 800, 600);
  eventCountsByGroupChart.container('container');
  eventCountsByGroupChart.draw();

  return eventCountsByGroupChart;
}

function buildIntervalBoxSizeChart(eventGroups: EventGroups) {
  const eventBoxAveragesByGroup = _.mapValues(
    eventGroups,
    (events) => _.sumBy(events, (e) => e.box.height * e.box.width) / events.length,
  );

  const eventsBoxBarData: [string, number][] = [];
  _.forOwn(eventBoxAveragesByGroup, (value, key) => eventsBoxBarData.push([key, value]));

  const eventBoxesByGroupChart = anychart.bar(eventsBoxBarData);
  eventBoxesByGroupChart.bounds(0, 0, 800, 600);
  eventBoxesByGroupChart.container('container');
  eventBoxesByGroupChart.draw();

  return eventBoxesByGroupChart;
}

export function buildBarChart() {
  return asyncMiddleware(async (req: Request, res: Response) => {
    const eventGroups = req?.context?.eventGroups || {};

    const eventCountsByGroupChart = buildIntervalSizeChart(eventGroups);
    const eventBoxSizeGroupChart = buildIntervalBoxSizeChart(eventGroups);

    const countReport = await anychartExport.exportTo(eventCountsByGroupChart, 'pdf');
    const boxSizeReport = await anychartExport.exportTo(eventBoxSizeGroupChart, 'pdf');

    const report = combinePDFBuffers(countReport, boxSizeReport);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=report.pdf',
      'Content-Length': report.length,
    });
    res.end(report);
  });
}
