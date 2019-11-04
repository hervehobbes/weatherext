import * as request from 'request-promise';

const apiKey = '323a805c82f4e444c4d6eb02dd3cc09f';

export interface CityWeather {
    city: string;
    temperature: number;
    description: string;
}


export class DataService {

    private city: string | undefined;

    constructor(city: string | undefined) {
        this.city = city;
    }

    public async getWeather(): Promise<CityWeather> {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${apiKey}`;
        const weatherResponse = JSON.parse(await request.get({ uri: url }));
        console.log(weatherResponse);
        return {
            description: weatherResponse.weather[0].main,
            temperature: weatherResponse.main.temp,
            city: weatherResponse.name
        };
    }


}