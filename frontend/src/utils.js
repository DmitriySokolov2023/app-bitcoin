export const percentDifference = (a, b) => {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export function totalBalance(assets) {
    let total = 0
    assets.map(asset => {
        total = +(total + asset.totalAmount).toFixed(2)
    })
    return total
}