import { Request, Response } from 'express';
import fs from 'fs';
// import jsdom from 'jsdom';
import plotly from 'plotly';
import { plot, Plot } from 'nodeplotlib';
import { asyncMiddleware } from '../../common/async-middleware';
import { getEvents } from '../../db';

export function doThing() {
  return asyncMiddleware(async (req: Request, res: Response) => {
    const from = req.query.from;
    const to = req.query.to;
    const interval = req.query.interval;

    if (!from || !to) {
      res.send({
        message: `'from' and 'to' must be defined`,
      });
      res.status(400);
    }

    const JSDOM = require('jsdom').JSDOM;
    const jsdom = new JSDOM('<body><div id="container"></div></body>', { runScripts: 'dangerously' });
    const window = jsdom.window;
    const anychart = require('anychart')(window);
    const anychartExport = require('anychart-nodejs')(anychart);

    // create and a chart to the jsdom window.
    var chart = anychart.pie([10, 20, 7, 18, 30]);
    chart.bounds(0, 0, 800, 600);
    chart.container('container');
    chart.draw();

    anychartExport.exportTo(chart, 'pdf').then(
      function (image) {
        fs.writeFile('anychart.pdf', image, function (fsWriteError) {
          if (fsWriteError) {
            console.log(fsWriteError);
          } else {
            console.log('Complete');
          }
        });
      },
      function (generationError) {
        console.log(generationError);
      },
    );
  });
}
