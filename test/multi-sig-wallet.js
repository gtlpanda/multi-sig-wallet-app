const chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;


const MultiSigWallet = artifacts.require("multiSigWallet");

contract("MultiSigWallet", accounts => {
  const owners = [accounts[0], accounts[1], accounts[2]];
  const NUM_CONFIRMATIONS_REQUIRED = 2;

  //create new multisig wallet and bind it to this variable for each of the test cases
  let wallet = beforeEach(async () => {
    wallet = await MultiSigWallet.new(owners, NUM_CONFIRMATIONS_REQUIRED)
  });

  describe("executeTransaction", () => {
    beforeEach(async () => {
      // need to create a transaction and confirm it by at least two owners
      // @params  to, value, and data required for function submitTransaction
      const to = owners[0];
      const value = 0;
      const data = "0x0";
      //here we call the function with the required params
      await wallet.submitTransaction(to, value, data);
      // we then call confirmTransaction to make sure that two owners out of three confirm the transaction 
      // @params  transaction index, confirm its from owner of wallet (1 and 2) 
      await wallet.confirmTransaction(0, {
        from: owners[0]
      });
      await wallet.confirmTransaction(0, {
        from: owners[1]
      });
    });


    // execute transaction should succeed
    // execute transaction should fail if already executed
    it("should execute", async () => {

      // store the result of the above transaction.executed = 0
      const res = await wallet.executeTransaction(0, {
        from: owners[0]
      });
      const {
        logs
      } = res;

      // aasert first event that was fired was equal to execute transaction event emitted
      // we confirm owner 0 is the one who made the call for execute transaction
      // we make sure that the execute transaction was 0 
      assert.equal(logs[0].event, "ExecuteTransaction");
      assert.equal(logs[0].args.owner, owners[0]);
      assert.equal(logs[0].args.txIndex, 0);

      // here we are checking that transaction.executed is set to true
      // first we get the transaction
      // then we check if its true
      const tx = await wallet.getTransaction(0);
      assert.equal(tx.executed, true);


    });

    // execute transaction should fail if alreayd executed
    // we use the try catch to check if the tx failed and it should because we already confirmed it executed in above code
    it("should reject if already executed", async () => {
      await wallet.executeTransaction(0, {
        from: owners[0]
      });

      // this is meant to fail and if it doesnt, that means the transaction didnt execute 
      await expect(wallet.executeTransaction(0, {
        from: owners[0]
      })).to.be.rejected;

      /*
      try {
        await wallet.executeTransaction(0, {
          from: owners[0]
        });
        throw new Error("tx did not fail.");
      } catch (error) {
        assert.equal(error.reason, "tx already executed");
      }
      */

    });

  });

});