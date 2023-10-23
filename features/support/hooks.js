var { Before, After } = require('cucumber');

Before((scenario) => { console.log(scenario.pickle.name); });

After(async function() {
    return await this.driver.quit();
});
