module.exports = {

  //Each "export" counts as one test case
  'main': browser => {

    //We direct our browser to the gogle homepage, and wait for it to load
    browser.url('http://google.com')
      .waitForElementVisible('body', 1000)

    // We then test to see that the "Search" button is visible
    browser.assert.elementPresent('input[value="Google Search"]')
      .saveScreenshot('./reports/homepage.png')

    //We then fill the search bar with the word "Nightwatch"
    browser.setValue('#lst-ib', 'Nightwatch')

    //then, we click on "Search", and wait for the search results to appear
    browser.click('input[value="Google Search"]')
      .waitForElementVisible('#resultStats', 1000)
      .saveScreenshot('./reports/search-result.png')

    //Once thats done, we close the browser
    browser.end()
  }
}
