
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})
test(' Check that clicking the Draw button displays the div with id = “choices” ', async () => {
    const drawButton = await driver.findElement(By.id('draw'))
    await drawButton.click()
    const choicesDiv = await driver.findElement(By.id('choices'))
    const displayed = await choicesDiv.isDisplayed()
    expect(displayed).toBe(true)
})
test(' Check that clicking an “Add to Duo” button displays the div with id = “player-duo” ', async () => {
    const drawButton = await driver.findElement(By.id('draw'))
    await drawButton.click()
    await driver.sleep(1000);
    const addToDuoButton = await driver.findElement(By.className('bot-btn') )
    await addToDuoButton.click()
    const playerDuoDiv = await driver.findElement(By.id('player-duo'))
    const displayed = await playerDuoDiv.isDisplayed()
    expect(displayed).toBe(true)
})
test(' Check that when a bot is “Removed from Duo”, that it goes back to “choices” ', async () => {
    const drawButton = await driver.findElement(By.id('draw'))
    await drawButton.click()

    const botsWhenDrawn = []
    let element = driver.findElement(By.id("choices"));
    let elements = await element.findElements(By.css("h3"));
    for(let e of elements) {
        botsWhenDrawn.push(await e.getText());
    }
    const botsAfterRemovedFromDuo = []

    const addToDuoButton = await driver.findElement(By.className('bot-btn') )
    await addToDuoButton.click()
    const RemovedFromDuoButton = await driver.findElement(By.xpath('/html/body/section[2]/section[1]/div/div/button'))
    await RemovedFromDuoButton.click()

    let element2 = driver.findElement(By.id("choices"));
    let elements2 = await element2.findElements(By.css("h3"));
    for(let e of elements2) {
        botsAfterRemovedFromDuo.push(await e.getText());
    }
    expect(botsAfterRemovedFromDuo).toEqual(expect.arrayContaining(botsWhenDrawn));
})