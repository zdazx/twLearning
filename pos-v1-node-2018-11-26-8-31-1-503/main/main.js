var loadFunc = require('../main/datbase');
var loadAllItems = loadFunc.loadAllItems;
var loadPromotions = loadFunc.loadPromotions;

function printInventory(inputs) {
    let shoppinglist = convertOrderToJsonFormat(inputs);
    let billInfo = getBillInfo(shoppinglist);
    let result = printBillInfo(shoppinglist, billInfo);

    console.log(result);
};

//#1：将输入转换为json数组
function convertOrderToJsonFormat(selectedItems) {
    let shoppinglist = [];      //转换成json数组之后的清单信息
    let items = loadAllItems();
    let promotions = loadPromotions();
    let index = 0;
    while(index < selectedItems.length){   //遍历输入的每条barcode，将其转化为对应的json对象
        let flag = false;
        if(shoppinglist.length > 0){
            shoppinglist.forEach(v => {
                if(v.barcode == selectedItems[index]){
                    v.numBuy++;
                    v.totalPriceOfItem += v.price;
                    flag = true;
                }
            });
        }
        if(!flag){     //json数组中无该条货品信息，则插入
            let subShoppingItem = {};
            let item = selectedItems[index].split("-");
            let matchItem;
            if(item.length > 1){   //称量计算的东西
                matchItem = items.filter((p) => {
                    return p.barcode == item[0].trim();
                })[0];
                subShoppingItem = matchItem;
                subShoppingItem.numBuy = parseInt(item[1]);
                subShoppingItem.totalPriceOfItem = subShoppingItem.numBuy * matchItem.price;
            }else {
                matchItem = items.filter((p) => {
                    return p.barcode == item[0].trim();
                })[0];
                subShoppingItem = matchItem;
                subShoppingItem.numBuy = 1;
                subShoppingItem.totalPriceOfItem = matchItem.price;
            }

            let promotionsBarcode = promotions.filter((p) => {
                return p.type == 'BUY_TWO_GET_ONE_FREE'.trim();
            })[0];
            if(promotionsBarcode.barcodes.indexOf(matchItem.barcode) != -1){  //是否为参与买二赠一的商品标志
                subShoppingItem.isGiveOne = 1;
            }else {
                subShoppingItem.isGiveOne = 0;
            }
            shoppinglist.push(subShoppingItem);
        }
        index++;
    }
    shoppinglist.forEach(v => {
        if(v.numBuy > 2){
            v.totalPriceOfItem -= v.price;
        }
    });
    return shoppinglist;

}

//#2：根据可能的优惠得到结算信息
function getBillInfo(shoppinglist) {
    let billInfo = {};
    let totalPrice = 0;
    let savedMoney = 0;
    let giveOneItem = [];
    shoppinglist.forEach(v => {
        totalPrice += v.totalPriceOfItem;
        if(v.isGiveOne == 1){   //记录清单中参与买二赠一的商品信息
            savedMoney += v.price;
            let temp = {};
            temp.barcode = v.barcode;
            temp.name = v.name;
            giveOneItem.push(temp);
        }
    });
    billInfo.totalPrice = totalPrice;
    billInfo.savedMoney = savedMoney;
    billInfo.giveOneItem = giveOneItem;

    return billInfo;
}

//#3：打印结算信息
function printBillInfo(shoppinglist, billInfo) {
    let result = '***<没钱赚商店>购物清单***\n';
    let tempResult = '挥泪赠送商品：\n';
    shoppinglist.forEach(v => {
        result += '名称：' + v.name + '，数量：' + v.numBuy + v.unit +
                '，单价：' + v.price.toFixed(2) + '(元)，小计：' + v.totalPriceOfItem.toFixed(2) + '(元)\n';
        if(v.isGiveOne == 1){
            tempResult += '名称：' + v.name + '，数量：1' + v.unit + '\n';
        }
    });
    result += '----------------------\n';
    tempResult += '----------------------\n';
    result += tempResult;
    result += '总计：' + billInfo.totalPrice.toFixed(2) + '(元)\n' + '节省：' +
        billInfo.savedMoney.toFixed(2) + '(元)\n' + '**********************';

    return result;

}

module.exports = {convertOrderToJsonFormat, getBillInfo, printBillInfo, printInventory};