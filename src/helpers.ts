import {
  Address,
  log,
  BigInt,
  ethereum
} from "@graphprotocol/graph-ts";
import { Cyberbroker, Transaction, Transfer_Cyberbroker, Transfer_UnrevealedTPLMechaPart, UnrevealedTPLMechaPart, User } from "../generated/schema";



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

export function getCyberbrokerTransfer(transaction: Transaction,timestamp:BigInt,logIndex:BigInt,token_id:string): Transfer_Cyberbroker {
  const id = token_id.concat(':').concat(transaction.id)+'@'+ logIndex.toString()
  // Grab a Transfer.
  let transfer = Transfer_Cyberbroker.load(id);
  if (transfer == null) {
    transfer = new Transfer_Cyberbroker(id);
    transfer.transaction=transaction.id
    transfer.cyberbroker=token_id
    transfer.from = Address.zero().toHex()
    transfer.to = Address.zero().toHex()
    transfer.timestamp = timestamp;
    transfer.save();
  }
  log.info("Found transfer: {}", [id]);
  return transfer;
}

// ------------- TPL MECHA PART

export function getUnrevealedTplMechaPart(
  id: BigInt
): UnrevealedTPLMechaPart {
  // Set id
  let token_id = id.toString()
  let U_TPLMechaPart = UnrevealedTPLMechaPart.load(token_id);
  if (U_TPLMechaPart == null) {
    // Create new UnrevealedTPLMechaPart Entity
    U_TPLMechaPart = new UnrevealedTPLMechaPart(token_id);
    // Set quantity 0 (helps knowing if collectible is new)
    U_TPLMechaPart.quantity = BigInt.zero()
    U_TPLMechaPart.save()
  }
  return U_TPLMechaPart;
}

export function getU_MechaPartTransfer(transaction: Transaction,timestamp:BigInt,logIndex:BigInt,token_id:string): Transfer_UnrevealedTPLMechaPart {
  const id = token_id.concat(':').concat(transaction.id)+'@'+ logIndex.toString()
  // Grab a Transfer.
  let transfer = Transfer_UnrevealedTPLMechaPart.load(id);
  if (transfer == null) {
    transfer = new Transfer_UnrevealedTPLMechaPart(id);
    transfer.transaction=transaction.id
    transfer.UnrevealedTPLMechaPart=token_id
    transfer.from = Address.zero().toHex()
    transfer.to = Address.zero().toHex()
    transfer.quantity = BigInt.zero()
    transfer.timestamp = timestamp;
    transfer.save();
  }
  log.info("Found transfer: {}", [id]);
  return transfer;
}