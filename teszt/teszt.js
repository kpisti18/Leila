const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

async function runTest() {
    // chrome elindítása 
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        // a webalkalmazás megnyítása
        await driver.get('http://localhost:5500/');

        // a form kitöltése
        await driver.findElement(By.id('loginEmail')).sendKeys('horvath.szilvia2005@gmail.com');
        await driver.findElement(By.id('loginPassword')).sendKeys('123456aA', Key.RETURN); // meghívja a submit eseményt

        // megvárjuk, míg átirányit az oldal
        await driver.wait(until.urlContains('/admin_kezdolap.html'), 10000);

        // Ellenőrzzük le az URL-t
        const currentURL = await driver.getCurrentUrl();

        // A teszt eredmény kiírása
        // Ha a currentURL tartalmaza  "/admin_kezdolap.html" részt akkor ok
        if(currentURL.includes('/admin_kezdolap.html')) {
            console.log('A teszt sikeresen lefutott!');
        }
        else console.log('A teszt sikertelen volt!');

    } catch (error) {
        console.log(error);
    } finally {
        await driver.quit();
    }
}

runTest();