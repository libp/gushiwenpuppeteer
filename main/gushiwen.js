'use strict';
const puppeteer = require('puppeteer');
var request = require('request');
var fs = require('fs');

/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri,filename,callback){
  let stream = fs.createWriteStream(filename);
  try {
    request(uri).pipe(stream).on('close', callback); 
  } catch (err) {
    console.log(err);
  }
}



(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  
  for(let i=1 ; i < 5; i++){
    let url = 'https://www.gushiwen.org/shiwen/default_0AA'+i+'.aspx';
    this.page = await browser.newPage();

    //添加await降低请求的速度，避免影响对端服务器
    await click(this.page,url);
    // click(this.page,url);
  }
  
  
})();

async function click(page,url){
  // let page = this.page;
  await page.goto(url);

  let mp3IDList = await page.$$('img[id*="speakerimg"]')
  console.log(mp3IDList)

  for(let i=0 ; i < mp3IDList.length; i++){
    await mp3IDList[i].click();
  }

  let cont = await page.$$('.left .sons')
  console.log(cont);
  // for(let i=0 ; i < cont.length; i++){
  for(let i=0 ; i < cont.length; i++){
    let title = await cont[i].$eval('.sons .cont a', el => el.innerText);
    console.log(title); 

    let source = await cont[i].$eval('.source', el => el.innerText);
    console.log(source);
    
    let dynasty = source.split("：")[0]
    let author = source.split("：")[1]
    console.log(dynasty);
    console.log(author);

    let contson = await cont[i].$eval('.contson', el => el.innerHTML);
    console.log(contson); 

    let audiosrc = await cont[i].$eval('audio', el => el.src).catch(function (err){
      console.log(err);
    });
    console.log(audiosrc)
    if (audiosrc === undefined){
      // audiosrc = null
      continue;
    }

    let id = audiosrc.split('/')[5]

    let filename = './mp3/' + id;
    downloadFile(audiosrc,filename,function(){ 
      console.log(filename+'下载完毕');
    });
  }
}

