type RateData = {
    lastValue: number,
    deltas: number[]
};

type Model = (x: number) => number;

type PlottingData = {
    lastUpdatedDate: string,
    FFR: RateData,
    STR: RateData,
    LTR: RateData,
    FRM: RateData,
    model1: Model,
    model2: Model,
    model3: Model
};