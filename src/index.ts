import puppeteer from "puppeteer";

(async () : Promise<void> => 
{
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto("https://www.dac.unicamp.br/portal/caderno-de-horarios/2020/1/S/G");
  const links = await page.$$eval(".lista-oferecimento a", nodes => nodes.map(node => node.getAttribute("href")));

  console.log(links);

  // await page.screenshot({path: "sample.png"});

  await browser.close();
})();