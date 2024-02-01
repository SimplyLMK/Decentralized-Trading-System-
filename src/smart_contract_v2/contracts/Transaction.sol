
// pragma solidity ^0.8.9;

// contract Transactions
// {
//     uint count = 0;

//     event Transfer(address from, address receiver, uint amount, string message , uint timestamp, string keyword);

//     struct TransferStruct
//     {
//         address sender;
//         address receiver;
//         uint amount;
//         string message;
//         uint timestamp;
//         string keyword;
//     }

//     TransferStruct[] public transfers;

//     // there is 1 more transaction so increment the count
//     // m
//     function add_Blockchain(address payable receiver, uint amount, string memory message, string memory keyword) public
//     {
//         count +=1;

//         // push the struct we created above along with its corresponding params into our transfer array
//         transfers.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

//         emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
//     }

//     // 
//     function get_Transactions() public view returns(TransferStruct[] memory)
//     {
//         return transfers;
//     }
    
//     //
//     function get_Transactions_Count() public view returns(uint)
//     {
//         return count;
//     }


    

// }


// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}