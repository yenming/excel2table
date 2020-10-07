const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');
const csv = require('csv');
const fsPromises = fs.promises;

const inputFilePath = path.resolve(__dirname, './size.csv');
const outputFilePath = path.resolve(__dirname, './size2table.csv');

// 最終 output 儲存的陣列
const output = [];
const time = new Date();

main();

async function main() {
  const inputFile = await fsPromises.readFile(inputFilePath);
  // parsedResult 讀取到的檔案內容
  const parsedResult = await parseCSV(inputFile, {
    delimiter: ',',
    columns: true,
  });
  console.log('parsedResult', parsedResult);
  console.log('time', time);
  
}
// 解析CSV
function parseCSV(input, options) {
  return new Promise((resolve, reject) => {
    parse(input, options, (error, output) => {
      if (error) {
        console.error('[ERROR] parseCSV: ', error.message);
        reject('[ERROR] parseCSV: ', error.message);
      }

      resolve(output);
    });
  });
}


// 定義要如何轉換資料
const transformer = csv.transform(function(data) {
    // data 會是讀到的資料
    data.push(data.shift());
    return data;
  });
  
  // 定義對應的事件 - 讀取到資料時
  transformer.on('readable', function() {
    let row;
    while ((row = transformer.read())) {
      output.push(row);
    }
  });
  
  // 定義對應的事件 - 錯誤處理
  transformer.on('error', function(err) {
    console.error(err.message);
  });
  
  // 定義對應的事件 - 讀取完資料時
  transformer.on('finish', function() {
    console.log('output', output);
  });
  
  // 帶入希望進行轉換的資料
  transformer.write(['']);

  
  // 關閉 readable stream
  transformer.end();

// 判斷每一個數字放哪裡
  function decidePosition(){
    let i,j=0;
    let dataPosition=[];
    
    // 把位置陣列空格挖好
      for(i=1;i<=7;i++){
        dataPosition[i]=[];
        console.log("dataPosition["+i+']:'+dataPosition[i]);
        for(j=1;j<=7;j++){
              dataPosition[i][j]=i*j;
              console.log("dataPosition["+i+']['+j+']:'+dataPosition[i][j]);
        }
      }
      
    
  }



function saveCSV({ input, fileName }) {
    return new Promise((resolve, reject) => {
      csv.stringify(
        // input,
        // {
        //   columns: ['通用商品編(Common product numbe)', 'HTML'],
        // },
        async function(error, data) {
          if (error) {
            console.error('[ERROR] saveCSV:' + error.message);
            reject('[ERROR] saveCSV:'+error.message);
          }
  
          await fsPromises.writeFile(`./` + time +`size2table.csv`, data);
          resolve(data);
        }
      );
    });
  }