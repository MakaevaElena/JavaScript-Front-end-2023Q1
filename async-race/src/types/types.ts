export type CarsType = Array<CarType>;

export type CarType = {
    name: string;
    color: string;
    id: number;
};

export type updatedCarDataType = {
    name: string;
    color: string;
};

export type newCarDataType = {
    name: string;
    color: string;
};

export type winnerDataType = {
    id: number;
    wins: number;
    time: number;
};

export type updatedWinnerData = {
    wins: number;
    time: number;
};
