const MultiSigWallet = artifacts.require("multiSigWallet");

// we pass in network and accounts then we will initialize them
module.exports = function (deployer, network, accounts) {
  const owners = accounts.slice(0, 3);
  const numConfirmationsRequired = 2;
  deployer.deploy(MultiSigWallet, owners, numConfirmationsRequired);
};