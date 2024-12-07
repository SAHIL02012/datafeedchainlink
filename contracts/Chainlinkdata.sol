// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract Chainlinkdata {

    AggregatorV3Interface[4] internal dataFeed;


    constructor() {
        dataFeed[0] = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        dataFeed[1] = AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22);
        dataFeed[2] = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        dataFeed[3] = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF);
    }

    function getChainLinkDataFeedLatestAnswer(uint256 number) external view returns (int,uint8) {
       (
        /* uint80 roundID */,
        int answer,
        /* uint startedAt */,
        /* uint timeStamp */,
        /* uint80 answeredInRound */
       ) = dataFeed[number].latestRoundData();
         uint8 decimals = dataFeed[number].decimals(); // Fetch the decimals
        return(answer,decimals);
    }
}