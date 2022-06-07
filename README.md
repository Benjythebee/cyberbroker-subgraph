# Subgraph for ETH collection
The repo for the Subgraph of cryptovoxels ethereum collections

You can follow the tutorial at [https://thegraph.com/docs/developer/quick-start](https://thegraph.com/docs/developer/quick-start)

## How it works:
The subgraph node listens to the factory contract at <a href='https://etherscan.io/address/0x59F41e2116F7d1B524C0542ABa0481Ecc0eAccED'>0x59F41e2116F7d1B524C0542ABa0481Ecc0eAccED</a>.

When a new contract is created, an event is fired containing the collection_id and the collection address;

The subgraph grabs that and automatically listens to the new contracts.

## Start-up

Clone the repo

Run `npm install -g @graphprotocol/graph-cli`

run `npm install`

run `npm run codegen`

### if studio
You can find the subgraph and the access key at `https://thegraph.com/studio/` You have to connect with wallet `0x21F7db7DaA3f03100EB6ad36f79e20972a79E6c0` (ask someone with 1password for seed phrase)
### if free hosted service (current)
Grab the access-key from the subgraph in `https://thegraph.com/legacy-explorer/dashboard`

### if studio
run `graph auth --studio <DEPLOY KEY>`

### if free hosted service (current)
run `graph auth --product hosted-service <ACCESS_TOKEN>`

(if that doesn't work, edit package.json and add `--access-token <ACCESS_TOKEN>` to the end of each graph script.)

# Deploying
run `npm run deploy`
or  `npm run deploy-local` if you have a local server set-up

