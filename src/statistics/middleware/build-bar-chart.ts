import fs from 'fs';
import { Request, Response } from '../../common';
import { asyncMiddleware } from '../../common/async-middleware';

export function buildBarChart() {
  return asyncMiddleware(async (req: Request, res: Response) => {
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
