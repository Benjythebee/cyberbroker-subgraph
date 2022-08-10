import {
  Address,
  log,
  BigInt
} from "@graphprotocol/graph-ts";
import { cyberbrokers } from "../generated/Cyberbrokers/cyberbrokers";
import { Cyberbroker, User } from "../generated/schema";



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