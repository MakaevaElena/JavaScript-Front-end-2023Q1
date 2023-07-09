export default class Api {
    private url = 'http://127.0.0.1:3000';
    // private url = 'http://localhost:3000';
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
            .then((json) => console.log(json))
            .catch((error) => console.log(error))
            .finally(() => console.log('finally'));
    }

    // createCar
    // deleteCar
    // updateCar

    // startEngine// stopEngine
    // driveCar

    // getWinners
    // getWinner
    // createWinner
    // delete Winner
    // updateWinner
}
