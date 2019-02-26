const main = require('../main/main');

describe('taxi fee', function () {
    it("returns 0 when the taxi drived -10 kilometer and waiting time were 0 seconds",function(){
        let numKm = -10;   //公里数
        let timeWait = 0;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(0);
    });

    it("returns 0 when the taxi drived 0 kilometer and waiting time were 0 seconds",function(){
        let numKm = 0;   //公里数
        let timeWait = 0;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(0);
    });

    it("returns 6 when the taxi drived 1 kilometer and waiting time were 1 seconds",function(){
        let numKm = 1;   //公里数
        let timeWait = 1;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(6);
    });

    it("returns 7 when the taxi drived 2 kilometer and waiting time were 2 seconds",function(){
        let numKm = 2;   //公里数
        let timeWait = 2;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(7);
    });

    it("returns 7 when the taxi drived 3 kilometer and waiting time were 1 seconds",function(){
        let numKm = 3;   //公里数
        let timeWait = 1;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(7);
    });

    it("returns 10 when the taxi drived 6 kilometer and waiting time were 5 seconds",function(){
        let numKm = 6;   //公里数
        let timeWait = 5;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(10);
    });

    it("returns 14 when the taxi drived 8 kilometer and waiting time were 12 seconds",function(){
        let numKm = 8;   //公里数
        let timeWait = 12;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(14);
    });

    it("returns 16 when the taxi drived 10 kilometer and waiting time were 10 seconds",function(){
        let numKm = 10;   //公里数
        let timeWait = 10;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(16);
    });

    it("returns 44 when the taxi drived 32 kilometer and waiting time were 15 seconds",function(){
        let numKm = 32;   //公里数
        let timeWait = 15;   // 停车等待时长
        let resultFee = main(numKm, timeWait);
        expect(resultFee).toEqual(44); 
    });
});
