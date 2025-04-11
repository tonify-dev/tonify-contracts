import { NetworkProvider } from '@ton/blueprint';
import { loadDealCreatedEvent, loadSaveData, loadDealData, loadMarketDeployedEvent } from '../wrappers/Market';
import { Cell } from '@ton/core';   
// Пример декодирования hex данных
const hexData3 = "b5ee9c72010205010001360001e9f39cb0ac0000000000000000801548ef9d206fef5febecb818d24c8ec776cc26c9bd31f2022f068d4e342261e0800000003000512ed0b1e8716433a0a46e0b40555bec1c92f280109c287364e5b11aa35964520002469e04067b219721e6379a80f27bb76e090d94c2aee70254fb80dbaa3925fd4001039b800126742060478d0cd33ffc654280fd027a02e449f118b32a7ffc056cdd75849f0000000787312d007312d01003d471be63fdb430628665cfdf8be841ffd88818b26f35fe095591974d61bddec60203040006455448000000c30000000000000000000000000000000000000000000000000000000000455448000000000000000000000000000000000000000000000000000000005553445480000000000000000000000000000000000000000000000000000000000000000010";
const hexData1 = "b5ee9c7201010101003900006d0108ab4b00000000000000000000000080028976858f438b219d0523705a02aadf60e497940084e1439b272d88d51acb228a0cdddc2641";
const hexData2 = "b5ee9c7201010301008500015bafe93535000000000000000080028976858f438b219d0523705a02aadf60e497940084e1439b272d88d51acb229001015901029d3e0b9cc01cc4b40202faf080283377709903392af9633a6761600000000000000000000000000000000402004380028976858f438b219d0523705a02aadf60e497940084e1439b272d88d51acb2290";
export async function run(provider: NetworkProvider) {

    try {
        const cell = Cell.fromBoc(Buffer.from(hexData1, 'hex'))[0];
        const decodedDeal = loadDealCreatedEvent(cell.beginParse());
        console.log('Декодированные данные:', {
            dealId: decodedDeal.dealId.toString(),
            maker: decodedDeal.maker.toString(),
            collateralAmountMaker: decodedDeal.collateralAmountMaker.toString(),
            queryId: decodedDeal.queryId.toString(),
        });


        const cell2 = Cell.fromBoc(Buffer.from(hexData2, 'hex'))[0];
        const saveData = loadSaveData(cell2.beginParse());
        console.log('saveData:', {
            collateralAmountMaker: saveData.data.beginParse(),
            queryId: saveData.queryId.toString(),
        });

        const dealData =  loadDealData(saveData.data.beginParse());
        console.log('dealData:', dealData);

        const cell3 = Cell.fromBoc(Buffer.from(hexData3, 'hex'))[0];
        const decodedDeal2 = loadMarketDeployedEvent(cell3.beginParse());
        console.log(decodedDeal2);


    } catch (error) {
        console.error('Ошибка при декодировании:', error);
    }
}

