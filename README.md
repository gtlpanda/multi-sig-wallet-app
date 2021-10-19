# multi-sig-wallet-app

Make sure to edit your `truffle-config.js` file and change solc :: version to contract pragma version.

## setting up the app

1. `npm init -y`
2. `npm i -g truffle`
3. `npm -i --save-dev chai chai-as-promised`
4. `truffle init`

## testing with truffle

1. truffle compile

## deploying truffle dev chain to test on

This deploys a local chain to test against. Please refer to /migrations/`2_deploy_contracts.js`.

1. `truffle develop`
2. `migrate`
