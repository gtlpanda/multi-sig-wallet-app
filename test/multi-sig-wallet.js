const chai = require("chai");
chai.use(require("chai-as-promised"));


const MultiSigWallet = artifacts.require("multiSigWallet");

contract("MultiSigWallet", accounts => {
  const owners = [accounts[0], accounts[1], accounts[2]];
  const NUM_CONFIRMATIONS_REQUIRED = 2;

  //create new multisig wallet and bind it to this variable for each of the test cases
  let wallet = beforeEach(async () => {
    wallet = await MultiSigWallet.new(owners, NUM_CONFIRMATIONS_REQUIRED)
  });

  // execute transaction should succeed
  // execute transaction should fail if already executed
  it("should execute", async () => {
    // need to create a transaction and confirm it by at least two owners
    const to = owners[0];
    const value = 0;
    const data = "0x0";
    await wallet.submitTransaction(to, value, data);
  });

});