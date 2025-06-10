import Decimal from "decimal.js"

export function convertToInch(centimeters: number) {
    return new Decimal(centimeters).div(2.54).toNumber()
}