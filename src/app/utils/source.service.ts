import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  altitudeAGL = 0;
  altitudeASL = 0;
  coordinateX = 0;
  coordinateY = 0;
  speed = 0;
  rpm = 0;
  vspeed = 0;
  fuel = 0;
  targetDist = 0;
  impactDistance = 0;
  heading = 0;
  cameraDir = 0;
  horizonBank = 0;
  horizonDive = 0;
  windage = 0;
  throttle = 0;
  rtdCollective = 0;
  rtdRotorTorque = 0;
  rtdGForce = 0;
  rtdRpm1 = 0;
  rtdRpm2 = 0;
  rtdRpm3 = 0;
  ClockHour = 0;
  ClockMinute = 0;
  ClockSecond = 0;
  WPDist = 0;
  WPIndex = 0;
  MissileFlightTime = 0;
  AoA = 0;
  gmeter = 0;
  gmeterX = 0;
  gmeterY = 0;
  gmeterZ = 0;
  gmeterGrav = 0;
  gmeterXGrav = 0;
  gmeterYGrav = 0;
  gmeterZGrav = 0;
  cmAmmo = 0;
  cmWeapon = 0;
  vtolvectoring = 0;
  pylonAmmo = 0;
  pylonAmmoRelative = 0;
  cameraHeadingDiff = 0;
  cameraHeadingDiffX = 0;
  cameraHeadingDiffY = 0;
  targetHeight = 0;
  weaponHeading = 0;
  laserDist = 0;

  constructor() {
  }
}
