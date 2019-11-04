
import * as vscode from 'vscode';
import { DataService } from './DataService';

let weatherStatusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "weatherext" is now active!');


	let getWeather = vscode.commands.registerCommand('extension.getWeather', () => {

		vscode.window.showInputBox({ value: 'please enter your city' }).then(async city => {
			const dataService: DataService = new DataService(city);

			const result = await dataService.getWeather();
			console.log(result);
			if (!weatherStatusBarItem) {
				weatherStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
			}
			weatherStatusBarItem.text = result.city + ' ' + result.temperature + ' ' + result.description;
			weatherStatusBarItem.show();
		});
	});

	let getWeatherMap = vscode.commands.registerCommand('extension.getWeatherMap', () => {

	});

	context.subscriptions.push(getWeather, getWeatherMap);
}

// this method is called when your extension is deactivated
export function deactivate() { }
