
// Template imports
import {
  Cyberbroker,
  OwnerUTPLMechaPartLookup,
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
  getCyberbrokerTransfer,
  getTransaction,
  getUnrevealedTplMechaPart,
  getU_MechaPartTransfer
} from './helpers'

import { OwnershipTransferred, Transfer } from "../generated/Cyberbrokers/cyberbrokers";
import { TransferBatch, TransferSingle,TplMechaContract as UnrevealedTplMechaContract } from "../generated/TplMechaContract/TplMechaContract";

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

  let transferEntity = getCyberbrokerTransfer(transaction,event.logIndex,cyberbroker.id)
  transferEntity.from=userFrom.id
  transferEntity.to=userTo.id;
  
  cyberbroker.owner = userTo.id;
  cyberbroker.transferCount = cyberbroker.transferCount.plus(BigInt.fromI32(1))
  cyberbroker.save()
  transferEntity.save()
}


// ==============================================
// TPL UNREVEALED MECHA PARTS
// ==============================================

export function handleTransferBatch(event: TransferBatch): void {

  // Grab the list of IDs in the transaction
  let tokenIds = event.params.ids;
  log.info("New transferBatch, from: {}, to: {}", [
    event.params.from.toHex(),
    event.params.to.toHex(),
  ]);

  let from = event.params.from.toHex();
  let to = event.params.to.toHex();

  // Get the users and save them.
  let userFrom = getUser(event.params.from);
  let userTo = getUser(event.params.to);


  let transaction = getTransaction(event.transaction.hash.toHex(),event.block)
  transaction.save()

  // Bind a contract instance given the address of this event.
  let contract = UnrevealedTplMechaContract.bind(event.address);

  // Grab the quantities traded for each Ids.
  let values = event.params.values;
  log.debug("Starting loop of batch", []);
  for (let index = 0; index < tokenIds.length; index++) {
    // Token id
    let token_id = tokenIds[index];
    // ID of that collectible for the subgraph
    let id = token_id.toString()
    // Quantity traded for that collectible
    let q = values[index];

    let transferEntity = getU_MechaPartTransfer(transaction,event.logIndex,id)
    transferEntity.from=userFrom.id
    transferEntity.to=userTo.id;  
    transferEntity.quantity = q;
    transferEntity.save()

    log.info("index: {}, tokenID: {}, value: {}", [
      index.toString(),
      token_id.toString(),
      q.toString(),
    ]);
    // Grab the collectible
    let collectible = getUnrevealedTplMechaPart(token_id);
    // Check quantity of that collectible, if 0 we set the quantity to the quantity traded
    if (collectible.quantity == new BigInt(0)) {
      collectible.quantity = q;
    }
    //Check if quantity traded is > recorded quantity, and set the quantity to the quantity traded
    if (collectible.quantity < q) {
      collectible.quantity = q;
    }
    collectible.save();

    let wasMinted: boolean = from == Address.zero().toHex()

    let isBurned: boolean = to == Address.zero().toHex();

    // If it was minted, the FROM address is the Zero address, therefore we don't create a lookup for it. (it won't work)
    // NOTE: WHEN COLLECTIBLES ARE MINTED, THEY NEVER CALL TransferBatch.
    // This check is just for precautions.
    if (wasMinted == false) {
      // Lookups management
      // I denote look-ups with the id `UserAddress:tokenId`
      const key = from + '@' + id
      let fromLookup = OwnerUTPLMechaPartLookup.load(key);
      if (fromLookup == null) {
        fromLookup = new OwnerUTPLMechaPartLookup(key);
        fromLookup.owner = from;
        fromLookup.UnrevealedTPLMechaPart = id;
        fromLookup.quantity = BigInt.zero()
        fromLookup.save();
      }

      // We ask the contract to know how much the FROM user owns.
      let ownedQuantity_from = contract.try_balanceOf(event.params.from, token_id);

      if(!ownedQuantity_from.reverted) {
        // if contract responded, set the quantity FROM user owns.
        fromLookup.quantity = ownedQuantity_from.value;
      } else if (fromLookup.quantity >= q) {
        // if not we attempt basic math.
        let amount = fromLookup.quantity.toI32() - q.toI32();
        fromLookup.quantity = new BigInt(amount);
      } else {
        // Else, if we can't substract more than the user has, we set it to 0; (to avoid negative numbers)
        fromLookup.quantity = BigInt.zero()
      }

      fromLookup.save();
    }

    // If it was burned, the TO address is the Zero address, therefore we dont'  create a lookup for it. (it won't work)
    if (isBurned == false) {
      // to lookup handler
      // I denote look-ups with the id `UserAddress:tokenId`
      const key = from + '@' + id
      let toLookup = OwnerUTPLMechaPartLookup.load(key);
      if (toLookup == null) {
        toLookup = new OwnerUTPLMechaPartLookup(key);
        toLookup.owner = to;
        toLookup.UnrevealedTPLMechaPart = id;
        toLookup.quantity = BigInt.zero()
        toLookup.save();
      }
      // Hit the contract to ask how much that user owns.
      let ownedQuantity_to = contract.try_balanceOf(event.params.to, token_id);

      if (!ownedQuantity_to.reverted) {
        // if contract responded, set the quantity TO user owns.
        toLookup.quantity = ownedQuantity_to.value;
      } else {
        // if contract did not respond, We attempt math.
        let amount = toLookup.quantity.toI32() + q.toI32();
        toLookup.quantity = new BigInt(amount);
      }
      // //Check the quantity is valid:
      // if (toLookup.quantity == null) {
      //   toLookup.quantity = new BigInt(1);
      // }
      toLookup.save();
    }
  }
}


export function handleTransferSingle(event: TransferSingle): void {

  // Value of the transaction (generally null for single transfers, and X for minted.)
  let value = event.params.value
  if (!value) {
    value = new BigInt(1);
  }
  log.info("New singleTransfer: hash {}, token_id: {}, value: {}, from: {}", [
    event.transaction.hash.toHex(),
    event.params.id.toString(),
    value.toString(),
    event.params.from.toHex(),
  ]);
  let tokenId = event.params.id;
  let from = event.params.from.toHex();
  let to = event.params.to.toHex();
  let userFrom = getUser(event.params.from);
  let userTo = getUser(event.params.to);

  let transaction = getTransaction(event.transaction.hash.toHex(),event.block)
  let transferEntity = getU_MechaPartTransfer(transaction,event.logIndex,tokenId.toString())
  transferEntity.from=userFrom.id
  transferEntity.to=userTo.id;  
  transaction.save()
  
  
  let wasMinted: boolean = from == "0x0000000000000000000000000000000000000000";
  
  let isBurned: boolean = to == "0x0000000000000000000000000000000000000000";

  // Set id of Collectible as `tokenId@CollectionAddress`
  let id = tokenId.toString()
  log.info("transfer Id: {}", [id]);
    
  let UTPLMechaPart = getUnrevealedTplMechaPart(tokenId);
  // If collectible was minted, we assign that collectible's quantity the value.
  if (wasMinted) {
    log.info("Collectible was minted: {}", [event.params.value.toString()]);
    UTPLMechaPart.quantity = value;
  } else if (UTPLMechaPart.quantity == BigInt.zero()) {
    // If not minted but collectible entity was already created and has no quantity
    // We give it a new quantity.
    log.info("Collectible has new quantity: {}", [value.toString()]);
    UTPLMechaPart.quantity = value;
  }
  // If collectible somehow has a lower quantity than the value traded, we set the quantity to the value.
  if (UTPLMechaPart.quantity < value) {
    UTPLMechaPart.quantity = value;
  }
  transferEntity.quantity = value;
  // save collectible
  UTPLMechaPart.save();
  transferEntity.save()

  log.info("Fetching contract for lookups: {}", [event.address.toHex()]);

  let contract = UnrevealedTplMechaContract.bind(event.address);

  // Now we create a lookup so we can find the collectibles a user (FROM and TO) owns.

  // If it was minted, the FROM address is the Zero address, therefore we don't create a lookup for it.
  if (wasMinted == false) {
    // I denote look-ups with the id `UserAddress@tokenId`
    let fromLookupId = from + "@" + id;

    let fromLookup = OwnerUTPLMechaPartLookup.load(fromLookupId);
    if (fromLookup == null) {
      // Lookup doesn't exist so we create a new one.
      fromLookup = new OwnerUTPLMechaPartLookup(fromLookupId);
      fromLookup.owner = from;
      fromLookup.UnrevealedTPLMechaPart = id;
      fromLookup.quantity = BigInt.zero()
      fromLookup.save();
    }

    log.debug("Getting balance of from: {}", [event.params.from.toHex()]);

    // We hit the contract of that collection and ask it how much the FROM user owns.
    let balFrom = contract.try_balanceOf(event.params.from, BigInt.fromString(UTPLMechaPart.id));
    if (!balFrom.reverted) {
      // if contract responded, set the quantity FROM user owns.
      fromLookup.quantity = balFrom.value;
    } else if (fromLookup.quantity >= value) {
      // if contract badly responded, we attempt to do simple math and remove the quantity sent.
      let amount = fromLookup.quantity.toI32() - value.toI32();
      fromLookup.quantity = new BigInt(amount);
    } else {
      // Else if the value sent is greater than previous quantity, we set it to 0.
      fromLookup.quantity = new BigInt(0);
    }
    fromLookup.save();
  }

  // If it was burned, the TO address is the Zero address, therefore we dont'  create a lookup for it. (it won't work)
  if (isBurned == false) {
    // I denote look-ups with the id `UserAddress@tokenId`
    let toLookupId = to + "@" + id;
    // to lookup handler
    let toLookup = OwnerUTPLMechaPartLookup.load(toLookupId);
    if (toLookup == null) {
      toLookup = new OwnerUTPLMechaPartLookup(toLookupId);
      toLookup.owner = to;
      toLookup.UnrevealedTPLMechaPart = id;
      toLookup.quantity = BigInt.zero()
      toLookup.save();
    }

    // This collectible was minted and sent to this user, therefore we know the user now owns the full value.
    if (wasMinted) {
      toLookup.quantity = value;
    } else {
      // Else, we hit the contract of this collectible's collection to know how much TO owns.
      let ownedQuantity_to = contract.try_balanceOf(
        event.params.to,
        BigInt.fromString(UTPLMechaPart.id)
      );
      if (!ownedQuantity_to.reverted) {
        // If replied nicely, we set the quantity that user owns for this collectible.
        toLookup.quantity = ownedQuantity_to.value;
      } else {
        // if contract badly responded, we attempt to do simple math and add the quantity received.
        let amount = toLookup.quantity.toI32() + value.toI32();
        toLookup.quantity = new BigInt(amount);
      }
      //Check the quantity is valid:
      // if (toLookup.quantity == null) {
      //   toLookup.quantity = new BigInt(1);
      // }
    }

    toLookup.save();
  }
}