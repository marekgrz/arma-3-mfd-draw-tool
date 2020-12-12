export class PolygonPoints {
  topLeft = [0, 0];
  topRight = [0, 0];
  bottomRight = [0, 0];
  bottomLeft = [0, 0];

  getTL = (): string => this.topLeft.toString();
  getTR = (): string => this.topRight.toString();
  getBR = (): string => this.bottomRight.toString();
  getBL = (): string => this.bottomLeft.toString();
}
