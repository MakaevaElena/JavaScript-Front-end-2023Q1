import { updatedCarDataType, newCarDataType } from './types/types';

export default class Api {
    private url = 'http://127.0.0.1:3000';
    private garage = `${this.url}/garage`;
    private engine = `${this.url}/engine`;
    private winners = `${this.url}/winners`;

    // constructor() {

    // }

    public getCars() {
        return fetch(`${this.garage}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((error) => console.log(error))
            .finally(() => console.log('finally'));
    }

    public getCar(id: number) {
        return fetch(`${this.garage}/${id}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((error) => console.log(error))
            .finally(() => console.log('finally'));
    }

    public createCar(newCarData: newCarDataType) {
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
            .finally(() => console.log('finally'));
    }

    public deleteCar(id: number) {
        return fetch(`${this.garage}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .catch((error) => console.log(error))
            .finally(() => console.log('finally'));
    }

    public updateCar(id: number, updatedCarData: updatedCarDataType) {
        return fetch(`${this.garage}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCarData),
        })
            .then((response) => response.json())
            .then((json) => json)
            .catch((error) => console.log(error))
            .finally(() => console.log('finally'));
    }

    // startEngine// stopEngine
    // driveCar

    // getWinners
    // getWinner
    // createWinner
    // delete Winner
    // updateWinner
}
