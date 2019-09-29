const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:8888/src/example/streaming/index.html')
  await page.waitFor('.apples')
  await page.screenshot({ path: 'example.png' })

  await browser.close()
})()
