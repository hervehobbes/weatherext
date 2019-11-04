
import * as vscode from 'vscode';

let weatherStatusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "weatherext" is now active!');


	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {

		vscode.window.showInformationMessage('Hello World!');
		weatherStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
