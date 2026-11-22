import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { strict as assert } from 'node:assert';
const html=readFileSync('index.html');
const server=createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(html)});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+server.address().port+'/';
const browser=await chromium.launch({headless:true});
try {
 for(const device of [{name:'Desktop',viewport:{width:1365,height:900}},{name:'Android',viewport:{width:390,height:844},isMobile:true,hasTouch:true}]){
  const context=await browser.newContext({viewport:device.viewport,isMobile:!!device.isMobile,hasTouch:!!device.hasTouch,acceptDownloads:false});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url,{waitUntil:'load'});
  assert.equal(await page.locator('#gratis-test').count(),1,device.name+' free test missing');
  assert.equal(await page.locator('#kundenpakete article.card').count()>=6,true,'six packages missing');
  assert.equal(await page.locator('#rsa-verify').count(),1,'public signature verifier missing');
  await page.locator('#gratis-file').setInputFiles({name:'example.txt',mimeType:'text/plain',buffer:Buffer.from('RHODIUM-TEST-12345')});
  await page.locator('#gratis-run').click();
  await page.locator('#gratis-status').getByText(/PASS/).waitFor({timeout:15000});
  assert.match(await page.locator('#gratis-report').innerText(),/Bitidentische lokale Kopie: PASS/);
  assert.match(await page.locator('#gratis-report').innerText(),/Gezielte Manipulation erkannt: PASS/);
  await page.locator('#gratis-reset').click();
  assert.match(await page.locator('#gratis-status').innerText(),/Bereit/);
  await page.locator('#demo-equal').click();
  await page.locator('#demo-status').getByText(/PASS/).waitFor({timeout:15000});
  await page.locator('#demo-changed').click();
  await page.locator('#demo-status').getByText(/PASS/).waitFor({timeout:15000});
  assert.deepEqual(errors,[],device.name+' JS page errors: '+errors.join(' / '));
  console.log('PASS '+device.name+' file upload (local only), SHA-256, manipulation, reset, generic demo, seal UI, six packages');
  await context.close();
 }
} finally { await browser.close();await new Promise(resolve=>server.close(resolve)); }
