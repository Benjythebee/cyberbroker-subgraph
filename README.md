# Subgraph for the Cyberbroker collection on ethereum
The repo for the [Subgraph](https://thegraph.com/hosted-service/subgraph/benjythebee/cyberbroker-subgraph) of Cyberbroker ethereum collections

You can follow the tutorial at [https://thegraph.com/docs/developer/quick-start](https://thegraph.com/docs/developer/quick-start)

## How it works:
The subgraph node listens to the cyberbroker at <a href='https://etherscan.io/address/0x892848074ddea461a15f337250da3ce55580ca85'>0x892848074ddea461a15f337250da3ce55580ca85</a>.

## Start-up

Clone the repo

Run `npm install -g @graphprotocol/graph-cli`

run `npm install`

run `npm run codegen`

### free hosted service (current)
Grab the access-key from the subgraph in `https://thegraph.com/legacy-explorer/dashboard`

### Authenticate
run `graph auth --product hosted-service <ACCESS_TOKEN>`

(if that doesn't work, edit package.json and add `--access-token <ACCESS_TOKEN>` to the end of each graph script.)

# Deploying
run `npm run deploy`
or  `npm run deploy-local` if you have a local server set-up

# Querying subgraph
Use your favorite GraphQl client (like urql).

URL to query: `https://api.thegraph.com/subgraphs/name/benjythebee/cyberbroker-subgraph`

Example query:
query{
  cyberbrokers(first: 5) {
    id
    owner {
      id
    }
    transferCount
  }
  users(first: 5) {
    id
    cyberbrokers {
      id
    }
  }
}
