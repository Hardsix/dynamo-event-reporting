import { Request, Response } from 'express';
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

    // require file system and jsdom
    var fs = require('fs');

    // require only anychart export module
    var anychartExport = require('anychart-nodejs');

    // define javascript string that represent code of chart creating
    var chart =
      "var chart = anychart.pie([10, 20, 7, 18, 30]); chart.bounds(0, 0, 800, 600); chart.container('container'); chart.draw()";

    // generate PDF image and save it to a file
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
