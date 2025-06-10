import Decimal from "decimal.js";

export function getPerimeter(radius: number): number {
    return new Decimal(radius).times(2).times(Math.PI).toNumber();
}

export function getArea(radius: number): number {
    return new Decimal(radius).pow(2).times(Math.PI).toNumber();
}
