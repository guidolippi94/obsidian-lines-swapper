import { App, Editor, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'swap-line-above',
			name: 'Swap Line Above',
			editorCallback: (editor, _) => this.swapLineAbove(editor),
			hotkeys: [
				{
					modifiers: ["Alt"],
					key: "ArrowUp",
				},
			],
		}
		);

		this.addCommand({
			id: 'swap-line-below',
			name: 'Swap Line Below',
			editorCallback: (editor, _) => this.swapLineBelow(editor),
			hotkeys: [
				{
					modifiers: ["Alt"],
					key: "ArrowDown",
				},
			],
		}
		);
	}

 	swapLineAbove(editor: Editor) : void {
		const lineNumber = editor.getCursor().line;
		const currentLineText = editor.getLine(lineNumber);
		const previousLine = editor.getLine(lineNumber -1);
		editor.setLine(lineNumber, previousLine);
		editor.setLine(lineNumber -1, currentLineText);
		editor.setCursor(lineNumber - 1);
	} 
 
	swapLineBelow(editor: Editor) : void {
		const lineNumber = editor.getCursor().line;
		const currentLineText = editor.getLine(lineNumber);
		const nextLine = editor.getLine(lineNumber + 1);
		editor.setLine(lineNumber, nextLine);
		editor.setLine(lineNumber  +1, currentLineText);
		editor.setCursor(lineNumber + 1);
	} 

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}