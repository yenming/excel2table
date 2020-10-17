const parse = require('csv-parse');
const generate = require('csv-generate');
const ransform = require('stream-transform');
const stringify = require('csv-stringify');
const fs = require('fs');
const path = require('path');
const csv = require('csv');
const fsPromises = fs.promises;

const inputFilePath = path.resolve(__dirname, './size.csv');
const outputFilePath = path.resolve(__dirname, './size2table.csv');

// 最終 output 儲存的陣列
const output = [];
const clothingSort = {
  Bag = "Bag",
  Belt = "Belt",
  CasualShirt= "CasualShirt",
  CheckedShirt= "CheckedShirt",
  Dress= "Dress",
  Footwear= "Footwear",
  GraphicTShirt= "GraphicT-Shirt",
  Jacket= "Jacket",
  JacketLeather= "JacketLeather",
  Jeans= "Jeans",
  Jersey= "Jersey",
  Jewellery= "Jewellery",
  Knitwear= "Knitwear",
  Outerwear= "Outerwear",
  PlainJersey= "PlainJersey",
  PoloShirt= "PoloShirt",
  Shirt= "Shirt",
  Shorts= "Shorts",
  Skirt= "Skirt",
  SmallLeathers= "SmallLeathers",
  Sweatshirt= "Sweatshirt",
  Tailoring= "Tailoring",
  Top= "Top",
  Trousers= "Trousers",
  Watches= "Watches",
};
const unitSizeSort = {
  XXXS = "XXXS",
  XXS = "XXS" ,
  XS = "XS" ,
  S = "S" ,
  M = "M" ,
  L = "L" ,
  XL = "XL" ,
  XXL = "XXL" ,
  XXXL = "XXXL" ,
};
const numSizeSort = {
  Size1 = "Size 1",
  Size2 = "Size 2" ,
  Size4 = "Size 4",
  Size5= "Size 5",
  Size6= "Size 6",
  Size7= "Size 7",
  Size8= "Size 8",
  Size9= "Size 9",
  Size10= "Size 10",
  Size11= "Size 11",
  Size12= "Size 12",
  Size13= "Size 13",
  Size14= "Size 14",
  Size15= "Size 15",
  Size16= "Size 16",
  Size17= "Size 17",
  Size18= "Size 18",
  Size19= "Size 19",
  Size20= "Size 20",
  Size21= "Size 21",
  Size22= "Size 22",
  Size23= "Size 23",
  Size24= "Size 24",
  Size25= "Size 25",
  Size26= "Size 26",
  Size27= "Size 27",
  Size28= "Size 28",
  Size29= "Size 29",
  Size30= "Size 30",
  Size31= "Size 31",
  Size32= "Size 32",
  Size33= "Size 33",
  Size34= "Size 34",
  Size35= "Size 35",
  Size36= "Size 36",
  Size37= "Size 37",
  Size38= "Size 38",
  Size39= "Size 39",
  Size40= "Size 40",
  Size41= "Size 41",
  Size42= "Size 42",
  Size43= "Size 43",
  Size44= "Size 44",
  Size45= "Size 45",
  Size46= "Size 46",
  Size47= "Size 47",
  Size48= "Size 48",
  Size49= "Size 49",
  Size50= "Size 50",
}
const ukSize ={
  UK2= "UK 2",
  UK4= "UK 4",
  UK6= "UK 6",
  UK8= "UK8 8  ",
  UK10= "UK 10",
  UK12= "UK 12",
  UK14= "UK 14",
  UK16= "UK 16",
  UK18= "UK 18",

}
const size2= {
  XSS= "XS/S",
  SM= "S/M",
  ML= "M/L",
}
const size3 = {
  UK2US00= "UK 2/US 00",
  UK3US5EU36= "UK 3 /US 5/EU 36",
  UK4US6EU37= "UK 4/US 6/EU 37",
  UK5US7EU38= "UK 5/US 7/EU 38",
  UK6US8EU39= "UK 6/US 8/EU 39",
  UK7US8EU41= "UK 7/US8/EU 41",
  UK8US9EU42= "UK 8/US 9/EU 42",
  UK9US10EU43= "UK 9/US 10/EU 43",
  UK4US0= "UK 4/US 0",
  UK6US2= "UK 6/US 2",
  UK8US4= "UK 8/US 4",
  UK10US6= "UK 10/US 6",
  UK10US11EU44= "UK 10/US 11/EU 44",
  UK12US8= "UK 12/US 8",
  UK14US10= "UK 14/US 10",
  UK16US12= "UK 16/US 12",
}
const onsize ={
  OneSize= "<One Size>",
}
const time = new Date();

main();

async function main() {
  const inputFile = await fsPromises.readFile(inputFilePath);
  // parsedResult 讀取到的檔案內容
  const parsedResult = await parseCSV(inputFile, {
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


// 上方欄位內容
  function firstColumnChose (Column){
    var Column = [];
    for(i=0;0<=7;i++){
      firstColumnChoseResult = "<tr><td>版型建議</td><td>"+Column[0]+"</td><td>"+Column[1]+"</td><td>"+Column[2]+"</td><td>"+Column[3]+"</td><td>"+Column[4]+"</td><td>"+Column[5]+"</td><td>"+Column[6]+" </td></tr>"; 
    }
  }
 //左邊欄位
  function decideClothingSort(clothingSort,i,j,k,l,a,b,c){
    switch(clothingSort){
      case Bag:
      clothingSortResult = Rank5;
      case Belt:
      clothingSortResult = Rank2;
      case CasualShirt:
      clothingSortResult = Rank2;
      case CheckedShirt:
      clothingSortResult = Rank2;
      case  Dress:
      clothingSortResult = Rank8;
      case  Footwear:
      clothingSortResult = Rank8;
      case  GraphicTShirt:
      clothingSortResult = Rank2;
      case  Jacket:
      clothingSortResult = Rank3;
      case  JacketLeather:
      clothingSortResult = Rank3;
      case  Jeans:
      clothingSortResult = Rank4;
      case  Jersey:
      clothingSortResult = Rank2;
      case  Jewellery:
      clothingSortResult = Rank6;
      case  Knitwear:
      clothingSortResult = Rank3;
      case  Outerwear:
      clothingSortResult = Rank2;
      case  PlainJersey:
      clothingSortResult = Rank2;
      case  PoloShirt:
      clothingSortResult = Rank2;
      case  Shirt:
      clothingSortResult = Rank2;
      case  Shorts:
      clothingSortResult = Rank4;
      case  Skirt:
      clothingSortResult = Rank4;
      case  SmallLeathers:
      clothingSortResult = Rank7;
      case  Sweatshirt:
        clothingSortResult = Rank2;
      case  Tailoring:
        clothingSortResult = Rank0;
      case  Top:
        clothingSortResult = Rank2;
      case  Trousers:
        clothingSortResult = Rank4;
      case  Watches:
        clothingSortResult = Rank5;
    }

    switch(clothingSortResult){
      case Rank1:
        firstRanksChoseDetail = "<tr><td>高度</td>"+i+"</tr><tr><td>寬度</td>"+j+"</tr><tr><td>深度</td>"+k+"</tr><tr><td>肩帶</td>"+l+"</tr><tr><td>手提長</td>"+a+"</tr><tr><td>重量</td>"+b+"</tr><tr><td>-</td>"+c+"</tr>";
        return firstRanksChoseDetail;
      case Rank2:
        firstRanksChoseDetail = "<tr><td>胸寬</td>"+i+"</tr><tr><td>胸寬</td>"+j+"</tr><tr><td>臀寬</td>"+k+"</tr><tr><td>下擺寬</td>"+l+"</tr><tr><td>裙長</td>"+a+"</tr><tr><td>肩寬</td>"+b+"</tr><tr><td>袖長</td>"+c+"</tr>";
        return firstRanksChoseDetail;
      case Rank3:
        firstRanksChoseDetail = "<tr><td>袖長</td>"+i+"</tr><tr><td>肩寬</td>"+j+"</tr><tr><td>胸寬</td>"+k+"</tr><tr><td>腰寬</td>"+l+"</tr><tr><td>下擺寬</td>"+a+"</tr><tr><td>衣長</td>"+b+"</tr><tr><td>袖寬</td>"+c+"</tr>";
        return firstRanksChoseDetail;
      case Rank4:
        firstRanksChoseDetail = "<tr><td>腰寬</td>"+i+"</tr><tr><td>前檔長</td>"+j+"</tr><tr><td>臀寬</td>"+k+"</tr><tr><td>大腿寬</td>"+l+"</tr><tr><td>膝寬</td>"+a+"</tr><tr><td>內腿長</td>"+b+"</tr><tr><td>褲管寬</td>"+c+"</tr>";
        return firstRanksChoseDetail;
      case Rank5:
        firstRanksChoseDetail = "<tr><td>寬度</td>"+i+"</tr><tr><td>全長</td>"+j+"</tr><tr><td>-</td>"+k+"</tr><tr><td>-</td>"+l+"</tr><tr><td>-</td>"+a+"</tr><tr><td>-</td>"+b+"</tr><tr><td>-</td>"+c+"</tr>";
        return firstRanksChoseDetail;
      case Rank6:
        firstRanksChoseDetail = "<tr><td>重量</td>"+i+"</tr><tr><td>全長度</td>"+j+"</tr><tr><td>全寬度</td>"+k+"</tr><tr><td>吊墜寬度</td>"+l+"</tr><tr><td>吊墜長度</td>"+a+"</tr><tr><td>鍊長度</td>"+b+"</tr><tr><td>-</td>"+c+"</tr>";
        return firstRanksChoseDetail;
      case Rank7:
        firstRanksChoseDetail = "<tr><td>長</td>"+i+"</tr><tr><td>寬</td>"+j+"</tr><tr><td>-</td>"+k+"</tr><tr><td>-</td>"+l+"</tr><tr><td>-</td>"+a+"</tr><tr><td>-</td>"+b+"</tr><tr><td>-</td>"+c+"</tr>";
        return firstRanksChoseDetail;
      case Rank8:
        firstRanksChoseDetail = "<tr><td>cm</td>"+i+"</tr><tr><td>鞋底</td>"+j+"</tr><tr><td>鞋高</td>"+k+"</tr><tr><td>鞋跟高</td>"+l+"</tr><tr><td>-</td>"+a+"</tr><tr><td>-</td>"+b+"</tr><tr><td>-</td>"+c+"</tr>";              
        return firstRanksChoseDetail;   
    }
  }
// 判斷每一個數字放哪裡
  function decidePosition(){
    let i,j=0;
    let dataPosition=[];
    
    // 把位置陣列空格挖好
      for(i=1;i<=7;i++){
        dataPosition[i]=[];
        console.log("dataPosition["+i+']:'+dataPosition[i]);
        for(j=1;j<=7;j++){
              dataPosition[i][j]=i*j;//暫時先丟假數字
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