
import * as vscode from 'vscode';
import { DataService } from './DataService';

let weatherStatusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "weatherext" is now active!');


	const dataService: DataService = new DataService();
	let getWeather = vscode.commands.registerCommand('extension.getWeather', () => {

		vscode.window.showInputBox({ value: 'please enter your city' }).then(async city => {

			const result = await dataService.getWeather(city);
			console.log(result);
			if (!weatherStatusBarItem) {
				weatherStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
			}
			weatherStatusBarItem.text = result.city + ' ' + result.temperature + ' ' + result.description;
			weatherStatusBarItem.show();
		});
	});

	let getWeatherExtended = vscode.commands.registerCommand('extension.getWeatherExtended', () => {
		vscode.window.showInputBox({ value: 'please enter your city' }).then(async city => {
			const extendedWeather = await dataService.getWeatherExtended(city);
			vscode.window.showInformationMessage(JSON.stringify(extendedWeather));
			console.log(extendedWeather);
		});

	});

	context.subscriptions.push(getWeather, getWeatherExtended);
}


export function deactivate() { }
