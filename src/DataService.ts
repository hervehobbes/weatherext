import * as request from 'request-promise';

const apiKey = '323a805c82f4e444c4d6eb02dd3cc09f';

export interface CityWeather {
    city: string;
    temperature: number;
    description: string;
    lon: number;
    lat: number;
}


export class DataService {

    public async getWeather(city: string | undefined): Promise<CityWeather> {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;
        const weatherResponse = JSON.parse(await request.get({ uri: url }));
        console.log(weatherResponse);
        return {
            description: weatherResponse.weather[0].main,
            temperature: weatherResponse.main.temp,
            city: weatherResponse.name,
            lon: weatherResponse.coord.lon,
            lat: weatherResponse.coord.lat
        };
    }

    public async getWeatherMapUrl(city: string | undefined): Promise<String> {
        const cw = await this.getWeather(city);
        //return `https://tile.openweathermap.org/map/temp_new/3/${cw.lat}/${cw.lon}.png?appid=${apiKey}`;
        return `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat=${cw.lat}&lon=${cw.lon}&zoom=10`;
    }


}