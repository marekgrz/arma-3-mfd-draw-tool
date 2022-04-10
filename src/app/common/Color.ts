export class Color {
  r = 0;
  g = 0;
  b = 0;
  a = 0;

  constructor(red: number, green: number, blue: number, alpha: number) {
    this.r = red;
    this.g = green;
    this.b = blue;
    this.a = alpha;
  }

  static from(red: number, green: number, blue: number, alpha: number): Color {
    return new Color(red, green, blue, alpha);
  }
}
