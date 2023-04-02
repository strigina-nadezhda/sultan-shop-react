export interface Range {
  start: number;
  end: number;

  // contains(num: number): boolean;
}

// export class RangeImpl implements Range {
//   start: number;
//   end: number;

//   constructor(start: number, end: number) {
//     this.start = start;
//     this.end = end;
//   }

//   contains(num: number): boolean {
//     return this.start <= num && this.end >= num;
//   }
// }

export function rangeContains(range: Range, value: number): boolean {
  return range.start <= value && range.end >= value;
}
