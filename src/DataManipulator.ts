import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: Number,
  price_def: Number,
  ratio: Number,
  upper_bound: Number,
  lower_bound: Number,
  timestamp: Date,
  trigger_alert: Number | undefined
}


export class DataManipulator {
  static generateRow(resposne: ServerRespond[]): Row {
    const abcPrice = (resposne[0].top_ask.price + resposne[0].top_bid.price) / 2;
    const defPrice = (resposne[1].top_ask.price + resposne[1].top_bid.price) / 2;
    const ratio = abcPrice / defPrice;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;
    return {
      price_abc: abcPrice,
      price_def: defPrice,
      ratio,
      timestamp: resposne[0].timestamp > resposne[1].timestamp ?
        resposne[0].timestamp : resposne[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}