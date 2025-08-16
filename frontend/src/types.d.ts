type LastValue = {
    value: number,
    date: string
}

type PlottingData = {
    lastFFR: LastValue,
    lastSTR: LastValue,
    lastLTR: LastValue,
    lastFRM: LastValue,
    deltaFFR: number[],
    deltaSTR: number[],
    deltaLTR: number[],
    deltaFRM: number[]
    coefs1: [number, number],
    coefs2: [number, number],
    coefs3: [number, number]
}