
// Template imports
import {
  Cyberbroker,
  User,
} from "../generated/schema";
// Import utils
import {
  Address,
  BigInt,
  log,
} from "@graphprotocol/graph-ts";
import {
  getUser,
  getCyberbroker,
  getTransfer,
  getTransaction
} from './helpers'

import { OwnershipTransferred, Transfer } from "../generated/Cyberbrokers/cyberbrokers";

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // Grab the collection, if we know what the collection is (it's either legacy or not) we change the owner.
  getUser(event.params.newOwner);

  log.debug('Transfer ownership: contract: {}; owner:{}',[event.address.toHex(),event.params.newOwner.toHex()])
}


export function handleCyberBrokerTransfer(event: Transfer): void {
  log.info("New cyberbroker transfer: {}", [event.params.tokenId.toString()]);
  let cyberbroker = getCyberbroker(event.params.tokenId)
  let userFrom = getUser(event.params.from)
  let userTo = getUser(event.params.to)
  let transaction = getTransaction(event.transaction.hash.toHex(),event.block)

  let transferEntity = getTransfer(transaction,cyberbroker.id)
  transferEntity.from=userFrom.id
  transferEntity.to=userTo.id;
  
  cyberbroker.owner = userTo.id;
  cyberbroker.transferCount = cyberbroker.transferCount.plus(BigInt.fromI32(1))
  cyberbroker.save()
  transferEntity.save()
}
