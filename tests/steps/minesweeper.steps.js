const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/src/';

Given('a user opens the app', async() => {
	await page.goto(url);
});

Given('the user load the test board: {string}', async (string) => {
	await page.goto(url+'?mockDemo='+string);
});

Then('in the mines counter display should be {int}', async (int) => {
	const displayMines = await page.locator('data-testid=displayMines').innerText();
	expect(displayMines).toBe(int.toString());
});

Then('the time display should be: {int}', async (int) => {
	const displayTime = await page.locator('data-testid=displayTime').innerText();
	expect(displayTime).toBe(int.toString());
});

Then('the button face should be {string}', async (string) => {
	let face = await page.locator('data-testid=face').innerText();
	if(string == "happy") string = "\u{1F642}";
	expect(face).toBe(string);
});

Then('all the cells in the minefield should be {string}', async (string) => { 
	for(let i=1; i<9; i++){
		for(let j=1; j<9; j++){
			let cell =  await page.locator('data-testid='+i+"-"+j);
			await expect(cell).toHaveAttribute('class', string);
		}
	}			
});

When('the user tags the {string} cell as {string}', async (string, string2) => {
	let cellId = 'data-testid='+string.split("-")[0]+"-"+string.split("-")[1];
	if(string2 == "mined") await page.click(cellId, {button: 'right'});
	if(string2 == "questionable"){
		await page.click(cellId, {button: 'right'});
		await page.click(cellId, {button: 'right'});
	} 
	let cell =  await page.locator('data-testid='+string.split("-")[0]+"-"+string.split("-")[1]).innerText();
	if(string2 == "mined") string2 = "\u{1F6A9}";
	if(string2 == "questionable") string2 = "\u{2753}";
	expect(cell).toBe(string2);
});

Then('the cell {string} should show the {string} symbol', async (string, string2) => {
	let cell =  await page.locator('data-testid='+string.split("-")[0]+"-"+string.split("-")[1]).innerText();
	if(string2 == "mined") string2 = "\u{1F6A9}";
	if(string2 == "question") string2 = "\u{2753}";
	expect(cell).toBe(string2);
});

Given('the user tags the  {string} cell  as {string}', async (string, string2) => {
	let cellId = 'data-testid='+string.split("-")[0]+"-"+string.split("-")[1];
	if(string2 == "flag") await page.click(cellId, {button: 'right'});
	if(string2 == "question"){
		await page.click(cellId, {button: 'right'});
		await page.click(cellId, {button: 'right'});
	}	
});

Given('the mines counter display show {int} mines', async (int) => {
	const displayMines = await page.locator('data-testid=displayMines').innerText();
	expect(displayMines).toBe(int.toString());
});


When('the user put the {string} tag on a {string} cell', async (string, string2) => {
	let cellId = 'data-testid='+string2.split("-")[0]+"-"+string2.split("-")[1];
	await page.click(cellId, {button: 'right'});
});

Then('the mines counter display should be {int} mines', async (int) => {
	const displayMines = await page.locator('data-testid=displayMines').innerText();
	expect(displayMines).toBe(int.toString());
});

Given('tags as mined the {string} cell', async (string) => {
	let cellId = 'data-testid='+string.split("-")[0]+"-"+string.split("-")[1];
	await page.click(cellId, {button: 'right'});
});

Given('the mine counter is: {int}', async (int) => {
	const displayMines = await page.locator('data-testid=displayMines').innerText();
	expect(displayMines).toBe(int.toString());
});
	
When('the user tags as mined the {string} cell', async (string) => {
	let cellId = 'data-testid='+string.split("-")[0]+"-"+string.split("-")[1];
	await page.click(cellId, {button: 'right'});	
});

Then('the mines counter should be: {int}', async (int) => {
	const displayMines = await page.locator('data-testid=displayMines').innerText();
	expect(displayMines).toBe(int.toString());
});

When('the user exposes the {string} cell', async (string) => {
	await page.click('data-testid='+string);
});

Then('the board should display the next information:', async (docString) => {
	let cells = '';
	let height = 1;
	let width = 0;
	for(i=0; i<docString.length;i++){
		if(docString[i] == '\n') height++;
		else if(docString[i] != '|') cells = cells+docString[i];
	}
	width = (cells.length/height);
	for(let i=1; i<height; i++){
		for(let j=1; j<width; j++){
			let cell =  await page.locator('data-testid='+i+"-"+j);
			if(cells.substring((j+i-2),(j+i-1)) == 'x')
				await expect(cell).toHaveAttribute('class', 'hidden');
			else if(cells.substring((j+i-2),(j+i-1)) == '*')
				expect(await cell.innerText()).toBe('\u{2738}');
		}
	}
});

Then('the {string} cell should show value {int}', async (string, int) => {        
	let cellId = 'data-testid='+string.split("-")[0]+"-"+string.split("-")[1];
	let cell =  await page.locator(cellId).innerText();
	expect(cell).toBe(int.toString());
});

Then('the cell {string} should be empty', async (string) => {
	let cellId = 'data-testid='+string.split("-")[0]+"-"+string.split("-")[1];
	let cell =  await page.locator(cellId).innerText();
	expect(cell).toBe('');
});