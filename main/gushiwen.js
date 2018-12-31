'use strict';
const puppeteer = require('puppeteer');
var request = require('request');
var fs = require('fs');
const gushiwen = require('./sql');

/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(url,filename,callback){
  fs.open(filename, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error('myfile already exists');
        return;
      }
      throw err;
    }

    console.log('downloading');
    let stream = fs.createWriteStream(filename);
    try {
      request(url).pipe(stream).on('close', callback); 
    } catch (err) {
      console.log(err);
    }
  });
}

(async () => {
  const browser = await puppeteer.launch({
    // headless: false
  });
  
  for(let i=1 ; i < 2; i++){
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
  for(let i=0 ; i < cont.length; i++){
    // 获取标题
    let title = await cont[i].$eval('.sons .cont a', el => el.innerText);
    console.log(title); 

    // 获取作者和朝代
    let source = await cont[i].$eval('.source', el => el.innerText);
    // console.log(source);
    let dynasty = source.split("：")[0]
    let author = source.split("：")[1]
    console.log(dynasty);
    console.log(author);

    // 获取内容
    let contson = await cont[i].$eval('.contson', el => el.innerHTML);
    // console.log(contson); 

    // 获取tag
    let tag = await cont[i].$eval('.tag', el => el.innerText).catch(function (err){
      console.error(err);
    });
    if (tag === undefined){
      tag = null
    }else{
      tag = tag.replace(/[\r\n]/g,"").replace(/，/g,",")
    }
    console.log(tag)

    // 获取点赞数
    let scores = (await cont[i].$eval('.good', el => el.innerText)).trim();
    console.log(scores);

    // 获取音频地址
    let audiosrc = await cont[i].$eval('audio', el => el.src).catch(function (err){
      console.log(err);
    });
    console.log(audiosrc)
    if (audiosrc === undefined){
      audiosrc = null
    }

    // 获取内容ID
    let id = audiosrc.split('/')[5].split('.')[0]

    // 下载文件
    let filename = './mp3/' + id + '.mp3';
    await downloadFile(audiosrc,filename,function(){ 
      console.log(filename+'下载完毕');
    });

    gushiwen.insertGushiwen(id,title,author,contson,dynasty,filename,scores,tag)
  }
}


