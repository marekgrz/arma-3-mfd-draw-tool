export class Point {
  x = 0;
  y = 0;

  static from(x: number, y: number): Point {
    const point = new Point();
    point.x = x;
    point.y = y;
    return point;
  }
}
