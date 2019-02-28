var bestChargeFunc = require('../src/best-charge');
var bestCharge = bestChargeFunc.bestCharge;
var convertOrderToJsonFormart = bestChargeFunc.convertOrderToJsonFormart;
var twoChargeOfOrder = bestChargeFunc.twoChargeOfOrder;
var chooseCheaperOrder = bestChargeFunc.chooseCheaperOrder;
var printOrderInfo = bestChargeFunc.printOrderInfo;

describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = bestCharge(inputs).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
    expect(summary).toEqual(expected)
  });

  it('should generate json array of selected items', function() {
    let inputs = ["ITEM0013 x 4"];
    let result = convertOrderToJsonFormart(inputs);
    let expected = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      numBuy: 4,
      totalPriceOfItem: 24
    }];
    expect(result).toEqual(expected);
  });

  it('maybe generate two order with different charge', function() {
    let inputs = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      numBuy: 4,
      totalPriceOfItem: 24
    }];
    let result = twoChargeOfOrder(inputs);
    let expected = [];
    expect(result).toEqual(expected);
  });

  it('maybe generate two order with different charge', function() {
    let inputs = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      numBuy: 4,
      totalPriceOfItem: 24
    },{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      numBuy: 1,
      totalPriceOfItem: 18
    }];
    let result = twoChargeOfOrder(inputs);
    let expected = [{
      promotionType: '满30减6元',
      totalPrice: 36,
      savedMoney: 6
    },{
      promotionType: '指定菜品半价',
      totalPrice: 33,
      savedMoney: 9
    }];
    expect(result).toEqual(expected);
  });

  it('maybe generate two order with different charge', function() {
    let inputs = [{
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      numBuy: 1,
      totalPriceOfItem: 8
    },{
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00,
      numBuy: 1,
      totalPriceOfItem: 2
    }];
    let result = twoChargeOfOrder(inputs);
    let expected = [{
      promotionType: '指定菜品半价',
      totalPrice: 6,
      savedMoney: 4
    }];
    expect(result).toEqual(expected);
  });

  it('should generate final order', function() {
    let inputs1 = [{
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      numBuy: 1,
      totalPriceOfItem: 8
    },{
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00,
      numBuy: 1,
      totalPriceOfItem: 2
    }];
    let inputs2 = [{
      promotionType: '指定菜品半价',
      totalPrice: 6,
      savedMoney: 4
    }];
    let result = chooseCheaperOrder(inputs1, inputs2);
    let expected = {
      promotionType: '指定菜品半价',
      totalPrice: 6,
      savedMoney: 4
    };
    expect(result).toEqual(expected);
  });

  it('should generate final order', function() {
    let inputs1 = [{
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      numBuy: 5,
      totalPriceOfItem: 40
    },{
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00,
      numBuy: 8,
      totalPriceOfItem: 16
    }];
    let inputs2 = [{
      promotionType: '满30-6元',
      totalPrice: 50,
      savedMoney: 6
    },{
      promotionType: '指定菜品半价',
      totalPrice: 36,
      savedMoney: 20
    }];
    let result = chooseCheaperOrder(inputs1, inputs2);
    let expected = {
      promotionType: '指定菜品半价',
      totalPrice: 36,
      savedMoney: 20
    };
    expect(result).toEqual(expected);
  });

  it('should print order information', function() {
    let inputs1 = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      numBuy: 4,
      totalPriceOfItem: 24
    },{
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      numBuy: 1,
      totalPriceOfItem: 8
    }];
    let inputs2 = {
      promotionType: '满30减6元',
      totalPrice: 26,
      savedMoney: 6
    };
    let result = printOrderInfo(inputs1, inputs2).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();
    expect(result).toEqual(expected);
  });

  it('should print order information', function() {
    let inputs1 = [{
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      numBuy: 4,
      totalPriceOfItem: 24
    }];
    let inputs2 = {
      promotionType: '',
      totalPrice: 24,
      savedMoney: 0
    };
    let result = printOrderInfo(inputs1, inputs2).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(result).toEqual(expected);
  });

});
