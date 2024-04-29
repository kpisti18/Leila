const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

async function runTest(driver, browserName) {
    try{
        // Nyisd meg a waboldalt
        await driver.get('http://localhost:5500/');

        // Töltsd ki az űrlapot
        await driver.findElement(By.id('loginEmail')).sendKeys('horvath.szilvia2005@gmail.com');
        await driver.findElement(By.id('loginPassword')).sendKeys('123456aA', Key.RETURN); // meghívja a submit eseményt

        // megvárjuk, míg átirányit az oldal
        await driver.wait(until.urlContains('/admin_kezdolap.html'), 10000);

        // Ellenőrzzük le az URL-t
        const currentURL = await driver.getCurrentUrl();

        // A teszt eredmény kiírása
        // Ha a currentURL tartalmaza  "/admin_kezdolap.html" részt akkor ok
        if(currentURL.includes('/admin_kezdolap.html')) {
            console.log(`A teszt sikeresen lefutott a(z) ${browserName}-ban/ben!`);
        }
        else console.log('A teszt sikertelen volt!');
    } catch (error) {
        // Ha nem fut le a teszt
        console.log(`Hiba történt a ${browserName} böngészőben: ${error}`);
    } finally {
        // Zárjuk ba böngészőket
        await driver.quit();
    }
}

async function runTests() {
    // Az egyes böngészők megnyitása
    const chromeDriver = await new Builder().forBrowser('chrome').build();

    //const operaDriver = await new Builder().forBrowser('opera').build();

    // const operaGXDriver = await new Builder().forBrowser('opera gx').build();

    const edgeDriver = await new Builder().forBrowser('MicrosoftEdge').build();

    try{
        // Összes böngészőben lévő teszt végrehajtása egymás után Promise.all segítségével
        await Promise.all([
            runTest(chromeDriver, 'Chrome'),
           // runTest(operaDriver, 'Opera'),
            runTest(edgeDriver, 'Microsoft Edge')
        ]);
    } catch (error) {
        console.log(`Hiba történt a tesztek során: ${error}`);
    }
}

runTests();