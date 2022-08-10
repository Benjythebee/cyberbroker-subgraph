import {
  Address,
  log,
  BigInt,
  ethereum
} from "@graphprotocol/graph-ts";
import { Cyberbroker, Transaction, Transfer, User } from "../generated/schema";



export function getUser(address: Address): User {
  const addr = address.toHex()
  // Grab a user.
  let user = User.load(addr);
  if (user == null) {
    // create new user.
    user = new User(addr);
    user.save();
  }
  log.info("Found user: {}", [addr]);
  return user;
}

export function getCyberbroker(token_id: BigInt): Cyberbroker {
  const id = token_id.toString()
  // Grab a user.
  let cyberbroker = Cyberbroker.load(id);
  if (cyberbroker == null) {
    // create new user.
    cyberbroker = new Cyberbroker(id);
    cyberbroker.transferCount = BigInt.zero()
    cyberbroker.owner = Address.zero().toHex()
    cyberbroker.save();
  }
  log.info("Found cyberbroker: {}", [id]);
  return cyberbroker;
}

export function getTransaction(transactionHash: string,block: ethereum.Block): Transaction {
  const id = transactionHash
  // Grab a user.
  let tx = Transaction.load(id);
  if (tx == null) {
    // create new user.
    tx = new Transaction(id);
    tx.block = block.number
    tx.timestamp = block.timestamp
    tx.save();
  }
  return tx;
}

export function getTransfer(transaction: Transaction,token_id:string): Transfer {
  const id = token_id.concat(':').concat(transaction.id)
  // Grab a Transfer.
  let transfer = Transfer.load(id);
  if (transfer == null) {
    transfer = new Transfer(id);
    transfer.transaction=transaction.id
    transfer.cyberbroker=token_id
    transfer.from = Address.zero().toHex()
    transfer.to = Address.zero().toHex()
    transfer.save();
  }
  log.info("Found transfer: {}", [id]);
  return transfer;
}