require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  solidity: "0.8.9",
  networks:
  {
    sepolia:
    {
      url: "https://eth-sepolia.g.alchemy.com/v2/_cQb10zXZhy5PRgur8hYXZsvvlIpgKFr", // my alchemy depoyment app url
      accounts: ['1fd92d0f70352422cce7ddd1e6f54435e22bdf4fcaf5eac2c5a6dd77323b8c5c'] // my metamask private key
    }
  }
};
