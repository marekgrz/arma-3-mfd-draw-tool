import { Point } from '../../../common/Point';

export class BoneBaseModel {
  name: string;
  type: BoneType;
}

export enum BoneType {
  fixed = 'fixed',
  linear = 'linear',
  rotational = 'rotational',
  horizon = 'horizon',
  horizonToView = 'horizonToView',
  vector = 'vector',
  ils = 'ils',
  limit = 'limit'
}

// TODO Support for more bone types
// Currently supported: Fixed, Linear, Vector

export class BoneFixedModel extends BoneBaseModel {
  type = BoneType.fixed;
  pos0: Point = new Point();
}

export class BoneLinearModel extends BoneBaseModel {
  type = BoneType.linear;
  source: string;
  min!: number;
  max!: number;
  sourceScale!: number;
  minPos: Point = new Point();
  maxPos: Point = new Point();
}

export class BoneRotationalModel extends BoneBaseModel {
  type = BoneType.rotational;
  source!: string;
  min!: number;
  max!: number;
  sourceScale!: number;
  center: Point = new Point();
  minAngle!: number;
  maxAngle!: number;
  aspectRatio!: number;
}

export class BoneVectorModel extends BoneBaseModel {
  type = BoneType.fixed;
  pos0: Point = new Point();
  pos10: Point = new Point();
}
