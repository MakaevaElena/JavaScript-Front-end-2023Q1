import {
    UpdatedCarDataType,
    NewCarDataType,
    WinnerDataType,
    WinnersDataType,
    UpdatedWinnerData,
    CarsType,
    CarType,
    EngineResponse,
} from './types/types';

export default class Api {
    private url = 'http://127.0.0.1:3000';
    private garage = `${this.url}/garage`;
    private engine = `${this.url}/engine`;
    private winners = `${this.url}/winners`;

    public getAllCars(): Promise<CarsType> {
        return fetch(`${this.garage}`)
            .then((response) => response.json())
            .catch(() => console.log('no cars'));
    }

    public getCarsByPage(page: number, limit = 7): Promise<CarsType> {
        return fetch(`${this.garage}?_page=${page}&_limit=${limit}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((error) => console.log(error));
    }

    public getCar(id: number): Promise<CarType> {
        return fetch(`${this.garage}/${id}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((error) => console.log(error));
    }

    public createCar(newCarData: NewCarDataType): Promise<CarType> {
        return fetch(`${this.garage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCarData),
        })
            .then((response) => response.json())
            .then((json) => json)
            .catch((error) => console.log(error))
            .finally(() => console.log('createCar finally'));
    }

    public deleteCar(id: number): Promise<CarType> {
        return fetch(`${this.garage}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .catch((error) => console.log(error))
            .finally(() => console.log('deleteCar finally'));
    }

    public updateCar(id: number, updatedCarData: UpdatedCarDataType): Promise<CarType> {
        return fetch(`${this.garage}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCarData),
        })
            .then((response) => response.json())
            .catch((error) => console.log(error))
            .finally(() => console.log('updateCar finally'));
    }

    public startStopEngine(id: number, status: string): Promise<EngineResponse> {
        return fetch(`${this.engine}?id=${id}&status=${status}`, {
            method: 'PATCH',
        })
            .then((response) => response.json())
            .catch((error) => console.log(error))
            .finally(() => console.log('Car is started/stopped finally'));
    }

    public driveCar(id: number, status: string) {
        return fetch(`${this.engine}?id=${id}&status=${status}`, {
            method: 'PATCH',
        })
            .then((response) => (response.ok ? response.json() : response.status))
            .catch((error) => console.log(error))
            .finally(() => console.log('Car is drived finally'));
    }

    public getAllWinners(): Promise<WinnersDataType> {
        return (
            fetch(`${this.winners}`)
                .then((response) => response.json())
                // .catch((error) => console.log(error));
                .catch(() => console.log('no winners'))
        );
    }

    public getWinnersByPage(page: number, limit = 7, sort = 'id', order = 'ASC') {
        return (
            fetch(`${this.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`)
                .then((response) => response.json())
                // .catch((error) => console.log(error));
                .catch(() => console.log('no winners'))
        );
    }

    // public getWinner(id: number) {
    //     return fetch(`${this.winners}/${id}`).then((response) => response.json());
    // }

    public getWinner(id: number) {
        return fetch(`${this.winners}/${id}`)
            .then((response) => (response.ok ? response.json() : response.status))
            .catch((error) => console.log(error))
            .finally(() => console.log('getWinner finally'));
    }

    public createWinner(winnerData: WinnerDataType): Promise<WinnerDataType> {
        return (
            fetch(`${this.winners}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(winnerData),
            })
                .then((response) => response.json())
                .then((json) => json)
                // .catch((error) => console.log(error))
                .finally(() => console.log('createWinner finally'))
        );
    }

    public deleteWinner(id: number) {
        return fetch(`${this.winners}/${id}`, {
            method: 'DELETE',
        }).catch((error) => console.log(error));
    }

    public updateWinner(id: number, updatedWinnerData: UpdatedWinnerData) {
        return fetch(`${this.winners}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedWinnerData),
        })
            .catch((error) => console.log(error))
            .finally(() => console.log('updateWinner finally'));
    }
}
