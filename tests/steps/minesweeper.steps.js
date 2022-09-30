const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/src/';

Given('a user opens the app', async () => {
	await page.goto(url);
});

Given('the user load the test board: {string}', async (string) => {
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
	for(let i=0; i<8; i++){
		for(let j=0; j<8; j++){
			let cell =  await page.locator('id='+i+"-"+j);
			await expect(cell).toHaveAttribute('class', string);
		}
	}			
});

