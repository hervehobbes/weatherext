
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

	let getWeatherMap = vscode.commands.registerCommand('extension.getWeatherMap', () => {
		vscode.window.showInputBox({ value: 'please enter your city' }).then(async city => {
			const mapUrl = await dataService.getWeatherMapUrl(city);
			console.log(mapUrl);
			const panel = vscode.window.createWebviewPanel(
				'weatherMap',
				'Weather Map',
				vscode.ViewColumn.One,
				{}
			);
			panel.webview.html = getWebWiewContent(mapUrl);
		});

	});

	context.subscriptions.push(getWeather);
	context.subscriptions.push(getWeatherMap);
}

function getWebWiewContent(url: string): string {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="Content-Security-Policy" content="default-src 'none';">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Cat Coding</title>
	</head>
	<body>
		<img src="${url}"/>
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() { }
