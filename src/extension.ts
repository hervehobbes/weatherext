
import * as vscode from 'vscode';
import { DataService } from './DataService';

let weatherStatusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "weatherext" is now active!');


	let disposable = vscode.commands.registerCommand('extension.getWeather', () => {

		//	weatherStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
		vscode.window.showInputBox({value:'please enter your city'}).then(async city => {
			const dataService: DataService = new DataService(city);
			
			const result = await dataService.getWeather();
			console.log(result);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
