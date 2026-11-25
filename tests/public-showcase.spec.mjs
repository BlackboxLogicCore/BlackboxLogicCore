import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import assert from 'node:assert/strict';
const pages=new Set(['index.html','impressum.html','datenschutz.html','kundenportal.html']);
const server=createServer((req,res)=>{const p=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';if(!pages.has(p)){res.writeHead(404);res.end();return;}res.setHeader('Content-Type','text/html; charset=utf-8');res.end(readFileSync(p));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({headless:true});
try{
 for(const viewport of [{width:1365,height:900},{width:390,height:844}]){
 const page=await browser.newPage({viewport});const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 const url='http://127.0.0.1:'+server.address().port+'/';await page.goto(url);
 assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('#kundenpakete article.card').count(),6);
 assert.match(await page.locator('#pilot').innerText(),/OHNE ANMELDUNG/);
 assert.equal(await page.locator('#pilot a[href^="mailto:"]').count(),0);
 const file=bytes=>({name:'test.txt',mimeType:'text/plain',buffer:Buffer.from(bytes)});
 await page.locator('#gratis-run').click();assert.match(await page.locator('#gratis-status').innerText(),/Originaldatei/);
 await page.locator('#gratis-file').setInputFiles(file('abc'));await page.locator('#vergleich-file').setInputFiles(file('abc'));
 const before=requests.length;
 await page.locator('#gratis-run').click();await page.locator('#gratis-status').getByText(/^PASS:/).waitFor();
 let report=await page.locator('#gratis-report').innerText();assert.match(report,/ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad/);assert.match(report,/Bitidentische lokale Kopie: PASS/);assert.match(report,/Gezielte Manipulation erkannt: PASS/);assert.match(report,/Dateivergleich: BITIDENTISCH/);
 await page.locator('#vergleich-file').setInputFiles(file('abd'));await page.locator('#gratis-run').click();await page.locator('#gratis-status').getByText(/^PASS:/).waitFor();assert.match(await page.locator('#gratis-report').innerText(),/Dateivergleich: ABWEICHUNG/);
 await page.locator('#gratis-reset').click();assert.match(await page.locator('#gratis-status').innerText(),/Bereit/);assert.equal(await page.locator('#gratis-report').isVisible(),false);assert.equal(requests.length,before);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 for(const [label,path] of [['Impressum','impressum.html'],['Datenschutzerklärung','datenschutz.html']]){for(const region of ['header','footer']){const link=page.locator(region).getByRole('link',{name:label,exact:true});await link.click();assert.ok(page.url().endsWith(path));assert.equal(await page.locator('h1').innerText(),label);await page.goto(url);}}
 await page.goto(url+'kundenportal.html');await page.getByRole('link',{name:'Zum kostenlosen Dateitest'}).click();assert.ok(page.url().endsWith('index.html#pilot'));assert.deepEqual(errors,[]);await page.close();console.log('PASS public local self-service '+viewport.width+'; no protected system executed');
 }
}finally{await browser.close();await new Promise(r=>server.close(r));}
