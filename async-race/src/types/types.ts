export type CarsType = Array<CarType>;

export type CarType = {
    name: string;
    color: string;
    id: number;
};

export type UpdatedCarDataType = {
    name: string;
    color: string;
};

export type NewCarDataType = {
    name: string;
    color: string;
};

export type WinnersDataType = Array<WinnerDataType>;

export type WinnerDataType = {
    id: number;
    wins: number;
    time: number;
};

export type UpdatedWinnerData = {
    wins: number;
    time: number;
};

export type EngineResponse = {
    velocity: number;
    distance: number;
};
