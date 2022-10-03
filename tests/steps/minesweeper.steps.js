const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/src/';

Given('a user opens the app', async() => {
	await page.goto(url);
});

Given('the user load the test board: {string}', async(string) => {
	await page.goto(url+'?mockDemo='+string);
});

Then('in the mines counter display should be {int}', async(int) => {
	const displayMines = await page.locator('data-testid=displayMines').innerText();
	expect(displayMines).toBe(int.toString());
});

Then('the time display should be: {int}', async(int) => {
	const displayTime = await page.locator('data-testid=displayTime').innerText();
	expect(displayTime).toBe(int.toString());
});

Then('the button face should be {string}', async(string) => {
	if(string == "happy") string = "\u{1F642}";
	let face = await page.locator('data-testid=face').innerText();
	expect(face).toBe(string);
});

Then('all the cells in the minefield should be {string}', async(string) => { 
	for(let i=1; i<9; i++){
		for(let j=1; j<9; j++){
			let cell =  await page.locator('data-testid='+i+"-"+j);
			await expect(cell).toHaveAttribute('class', string);
		}
	}			
});

When('the user tags the {string} cell as {string}', async(string, string2) => {
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

  Then('the cell {string} should show the {string} symbol', async(string, string2) => {
	let cell =  await page.locator('data-testid='+string.split("-")[0]+"-"+string.split("-")[1]).innerText();
	if(string2 == "mined") string2 = "\u{1F6A9}";
	if(string2 == "question") string2 = "\u{2753}";
	expect(cell).toBe(string2);
});
