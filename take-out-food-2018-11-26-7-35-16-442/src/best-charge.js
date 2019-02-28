var loadPromotions = require('../src/promotions');
var loadAllItems = require('../src/items');

function bestCharge(selectedItems) {
  let selectedItemsInfo = convertOrderToJsonFormart(selectedItems);
  let orderOfTwoCharge = twoChargeOfOrder(selectedItemsInfo);
  let orderFinal = chooseCheaperOrder(selectedItemsInfo, orderOfTwoCharge);
  let result = printOrderInfo(selectedItemsInfo, orderFinal);

  return result;
}

//#1：将["ITEM0013 x 3", "ITEM0022 x 1"]这种形式的输入转换为订单json数组
function convertOrderToJsonFormart(selectedItems) {
  const length = selectedItems.length;
  let index = 0;
  if (!length){
    return [];
  }
  let selectedItemsInfo = [];   //将输入的字符串转换为items信息的json数组形式
  let subSelectedItemsInfo = {};   //item的具体信息

  let items = loadAllItems();
  while(index < length){
    let temp = selectedItems[index++].split(` x `);
    let matchItem = items.filter((p) => {
      return p.id == temp[0].trim();
    })[0];
    subSelectedItemsInfo = matchItem;
    subSelectedItemsInfo.numBuy = parseInt(temp[1]);
    subSelectedItemsInfo.totalPriceOfItem = subSelectedItemsInfo.numBuy * matchItem.price;
    selectedItemsInfo.push(subSelectedItemsInfo);
  }
  return selectedItemsInfo;
}

//#2：根据订单信息以及优惠信息，可能得到不同优惠方式
function twoChargeOfOrder(selectedItemsInfo) {
  let orderOfTwoCharge = [];
  let subOrderOfTwoCharge = {};
  let promotions = loadPromotions();

  //是否满足第一种优惠：满30-6
  let totalPrice = 0;
  for(let i in selectedItemsInfo ){
    totalPrice += selectedItemsInfo[i].totalPriceOfItem;
  }
  if (totalPrice >= 30){
    subOrderOfTwoCharge.promotionType = promotions[0].type;
    subOrderOfTwoCharge.totalPrice = totalPrice - 6;
    subOrderOfTwoCharge.savedMoney = 6;
    orderOfTwoCharge.push(subOrderOfTwoCharge);
  }

  //是否满足第二种优惠：菜品半价
  let savedMoney = 0;
  subOrderOfTwoCharge = {};
  totalPrice = 0;
  let isUsedHalfPrice = false;    //是否有菜品符合半价
  for(let i in selectedItemsInfo ){
    let flag = false;
    for(let item of promotions[1].items){
      if(selectedItemsInfo[i].id == item){
        flag = true;
      }
    }
    if (flag){
      isUsedHalfPrice = true;
      totalPrice += selectedItemsInfo[i].totalPriceOfItem / 2;
      savedMoney += selectedItemsInfo[i].totalPriceOfItem / 2;
    }else {
      totalPrice += selectedItemsInfo[i].totalPriceOfItem;
    }
  }
  if (isUsedHalfPrice){
    subOrderOfTwoCharge.promotionType = promotions[1].type;
    subOrderOfTwoCharge.totalPrice = totalPrice;
    subOrderOfTwoCharge.savedMoney = savedMoney;
    orderOfTwoCharge.push(subOrderOfTwoCharge);
  }
  return orderOfTwoCharge;
}

//#3：在可能有的两种优惠方式里确定选择哪一种更优惠的方式
function chooseCheaperOrder(selectedItemsInfo, orderOfTwoCharge) {
  let orderFinal = {};   //确定具体优惠方式的最终订单信息
  if(orderOfTwoCharge.length == 0){
    orderFinal.promotionType = ``;
    let totalPrice = 0;
    for(let i in selectedItemsInfo ){
      totalPrice += selectedItemsInfo[i].totalPriceOfItem;
    }
    orderFinal.totalPrice = totalPrice;
    orderFinal.savedMoney = 0;
  }else if(orderOfTwoCharge.length == 1){
    orderFinal = orderOfTwoCharge[0];
  } else {
    let index = 0;
    if(orderOfTwoCharge[0].totalPrice > orderOfTwoCharge[1].totalPrice){
      index = 1;
      let promotions = loadPromotions();
      for(let i in selectedItemsInfo ){
        for(let item of promotions[1].items){
          if(selectedItemsInfo[i].id == item){
            selectedItemsInfo[i].totalPriceOfItem = selectedItemsInfo[i].totalPriceOfItem / 2;
          }
        }
      }
    }
    orderFinal = orderOfTwoCharge[index];
  }
  return orderFinal;
}

//#4：打印订单信息
function printOrderInfo(selectedItemsInfo, orderFinal) {
  let result = `============= 订餐明细 =============`+`\n`;
  for(let i in selectedItemsInfo ){
    result += selectedItemsInfo[i].name + ` x ` + selectedItemsInfo[i].numBuy +
        ` = ` + selectedItemsInfo[i].numBuy * selectedItemsInfo[i].price + `元` +`\n`;
  }
  result += `-----------------------------------`+`\n`;
  if(orderFinal.promotionType == `满30减6元`){
    result += `使用优惠:` + `\n` + `满30减6元，省` + orderFinal.savedMoney + `元` +
      `\n` + `-----------------------------------` + `\n`;
  }else if(orderFinal.promotionType == `指定菜品半价`){
    result += `使用优惠:` + `\n` + `指定菜品半价(`;
    let promotions = loadPromotions();
    for(let i in selectedItemsInfo ){
      for(let item of promotions[1].items){
        if(selectedItemsInfo[i].id == item){
          result += selectedItemsInfo[i].name + `，`;
        }
      }
    }
    result = result.substr(0,result.length - 1);
    result += `)，省` +  orderFinal.savedMoney + `元` +
      `\n` + `-----------------------------------` + `\n`;
  }
  result += `总计：` + orderFinal.totalPrice + `元` +
    `\n` + `===================================`;

  return result;
}

module.exports = {bestCharge, convertOrderToJsonFormart,
  twoChargeOfOrder, chooseCheaperOrder, printOrderInfo};
