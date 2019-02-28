const printInventoryFunc = require('../main/main');
var printInventory = printInventoryFunc.printInventory;
var convertOrderToJsonFormat = printInventoryFunc.convertOrderToJsonFormat;
var getBillInfo = printInventoryFunc.getBillInfo;
var printBillInfo = printInventoryFunc.printBillInfo;

describe('pos', function () {
    var inputs;

    beforeEach(function () {
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should generate json array of selected items', function() {
        let inputs = ['ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000002-2',
            'ITEM000003-2',
            'ITEM000005-3'];
        let result = convertOrderToJsonFormat(inputs);
        let expected = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            numBuy: 5,
            totalPriceOfItem: 12,
            isGiveOne: 1
        },{
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50,
            numBuy: 2,
            totalPriceOfItem: 11,
            isGiveOne: 0
            },{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            numBuy: 2,
            totalPriceOfItem: 30,
            isGiveOne: 0
        },{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5,
            numBuy: 3,
            totalPriceOfItem: 9,
            isGiveOne: 1
        }];
        expect(result).toEqual(expected);
    });

    it('should generate json array of selected items', function() {
        let inputs = ['ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'];
        let result = convertOrderToJsonFormat(inputs);
        let expected = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            numBuy: 5,
            totalPriceOfItem: 12,
            isGiveOne: 1
        },{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            numBuy: 2,
            totalPriceOfItem: 30,
            isGiveOne: 0
        },{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5,
            numBuy: 3,
            totalPriceOfItem: 9,
            isGiveOne: 1
        }];
        expect(result).toEqual(expected);
    });

    it('should generate bill information', function() {
        let inputs = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            numBuy: 5,
            totalPriceOfItem: 12,
            isGiveOne: 1
        },{
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50,
            numBuy: 2,
            totalPriceOfItem: 11,
            isGiveOne: 0
        },{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            numBuy: 2,
            totalPriceOfItem: 30,
            isGiveOne: 0
        },{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5,
            numBuy: 3,
            totalPriceOfItem: 9,
            isGiveOne: 1
        }];
        let result = getBillInfo(inputs);
        let expected = {
            totalPrice: 62,
            savedMoney: 7.5,
            giveOneItem: [{
                barcode: 'ITEM000001',
                name: '雪碧'
            },{
                barcode: 'ITEM000005',
                name: '方便面'
            }]
        };
        expect(result).toEqual(expected);
    });

    it('should generate bill information', function() {
        let inputs = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            numBuy: 5,
            totalPriceOfItem: 12,
            isGiveOne: 1
        },{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            numBuy: 2,
            totalPriceOfItem: 30,
            isGiveOne: 0
        },{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5,
            numBuy: 3,
            totalPriceOfItem: 9,
            isGiveOne: 1
        }];
        let result = getBillInfo(inputs);
        let expected = {
            totalPrice: 51,
            savedMoney: 7.5,
            giveOneItem: [{
                barcode: 'ITEM000001',
                name: '雪碧'
            },{
                barcode: 'ITEM000005',
                name: '方便面'
            }]
        };
        expect(result).toEqual(expected);
    });

    it('should print inventory', function() {
        let inputs1 = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            numBuy: 5,
            totalPriceOfItem: 12,
            isGiveOne: 1
        },{
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            numBuy: 2,
            totalPriceOfItem: 30,
            isGiveOne: 0
        },{
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.5,
            numBuy: 3,
            totalPriceOfItem: 9,
            isGiveOne: 1
        }];
        let inputs2 = {
            totalPrice: 51,
            savedMoney: 7.5,
            giveOneItem: [{
                barcode: 'ITEM000001',
                name: '雪碧'
            },{
                barcode: 'ITEM000005',
                name: '方便面'
            }]
        };
        let result = printBillInfo(inputs1,inputs2);
        let expected =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';
        expect(result).toEqual(expected);
    });
});
