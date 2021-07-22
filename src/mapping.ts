import { NewCollectionCreated } from "../generated/collectionFactoryV1/collectionFactoryV1";
import {
  ApprovalForAll,
  MetaTransactionExecuted,
  OwnershipTransferred,
  TransferBatch as TransferBatchEvent,
  TransferSingle,
  URI,
  cvCollectibles as CollectibleContract,
} from "../generated/templates/cvCollectibles/cvCollectibles";

import { cvCollectibles } from "../generated/templates";
import {
  Collection,
  Collectible,
  OwnerCollectibleLookup,
  User,
} from "../generated/schema";
import {
  Address,
  BigInt,
  ethereum,
  JSONValueKind,
  log,
} from "@graphprotocol/graph-ts";
import {
  getLegacyCollection,
  isLegacyContractAddress,
  jsonToString,
} from "./helpers";

// we ignore these
export function handleApprovalForAll(event: ApprovalForAll): void {}

// we ignore these
export function handleMetaTransactionExecuted(
  event: MetaTransactionExecuted
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // Grab the collection, if we know what the collection is (it's either legacy or not) we change the owner.
  let collection = getCollection(event.address);
  if (collection == null) {
    // Contract is unknown.
    return;
  }
  collection.owner = event.params.newOwner.toHex();
  collection.save();
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  // GRab the collection. This should return a collection we have already registered.
  let collection = getCollection(event.address);
  if (collection == null) {
    // Contract is unknown.
    return;
  }
  // Grab the list of IDs in the transaction
  let tokenIds = event.params.ids;
  log.info("New transferBatch, from: {}, to: {}", [
    event.params.from.toHex(),
    event.params.to.toHex(),
  ]);

  let from = event.params.from.toHex();
  let to = event.params.to.toHex();

  // Get the users and save them.
  let userFrom = getUser(from);
  let userTo = getUser(to);

  // Bind a contract instance given the address of this event.
  let contract = CollectibleContract.bind(event.address);

  // Grab the quantities traded for each Ids.
  let values = event.params.values;
  log.debug("Starting loop of batch", []);
  for (let index = 0; index < tokenIds.length; index++) {
    // Token id
    let token_id = tokenIds[index];
    // ID of that collectible for the subgraph
    let id = token_id.toString() + "@" + collection.id;
    // Quantity traded for that collectible
    let q = values[index];

    log.info("index: {}, tokenID: {}, value: {}", [
      index.toString(),
      token_id.toString(),
      q.toString(),
    ]);
    // Grab the collectible
    let collectible = getCollectible(token_id, collection);
    // Check quantity of that collectible, if 0 we set the quantity to the quantity traded
    if (collectible.quantity == new BigInt(0)) {
      collectible.quantity = q;
    }
    //Check if quantity traded is > recorded quantity, and set the quantity to the quantity traded
    if (collectible.quantity < q) {
      collectible.quantity = q;
    }
    collectible.save();

    let wasMinted: boolean =
      from == "0x0000000000000000000000000000000000000000";

    let isBurned: boolean = to == "0x0000000000000000000000000000000000000000";

    // If it was minted, the FROM address is the Zero address, therefore we don't create a lookup for it. (it won't work)
    // NOTE: WHEN COLLECTIBLES ARE MINTED, THEY NEVER CALL TransferBatch.
    // This check is just for precautions.
    if (wasMinted == false) {
      // Lookups management
      // I denote look-ups with the id `UserAddress:tokenId@CollectibleAddress`
      let fromLookup = OwnerCollectibleLookup.load(from + ":" + id);
      if (fromLookup == null) {
        fromLookup = new OwnerCollectibleLookup(from + ":" + id);
        fromLookup.owner = from;
        fromLookup.collection = collection.id;
        fromLookup.collectible = id;
        fromLookup.quantity = new BigInt(0);
        fromLookup.save();
      }

      // We hit the contract of that collection and ask it how much the FROM user owns.
      let ownedQuantity_from = contract.balanceOf(event.params.from, token_id);
      if (ownedQuantity_from != null) {
        // if contract responded, set the quantity FROM user owns.
        fromLookup.quantity = ownedQuantity_from;
      } else if (fromLookup.quantity >= q) {
        // if not we attempt basic math.
        let amount = fromLookup.quantity.toI32() - q.toI32();
        fromLookup.quantity = new BigInt(amount);
      } else {
        // Else, if we can't substract more than the user have, we set it to 0; (to avoid negative numbers)
        fromLookup.quantity = new BigInt(0);
      }

      fromLookup.save();
    }

    // If it was burned, the TO address is the Zero address, therefore we dont'  create a lookup for it. (it won't work)
    if (isBurned == false) {
      // to lookup handler
      // I denote look-ups with the id `UserAddress:tokenId@CollectibleAddress`
      let toLookup = OwnerCollectibleLookup.load(to + ":" + id);
      if (toLookup == null) {
        toLookup = new OwnerCollectibleLookup(to + ":" + id);
        toLookup.owner = to;
        toLookup.collection = collection.id;
        toLookup.collectible = id;
        toLookup.quantity = new BigInt(0);
        toLookup.save();
      }
      // Hit the contract to ask how much that user owns.
      let ownedQuantity_to = contract.balanceOf(event.params.to, token_id);
      if (ownedQuantity_to != null) {
        // if contract responded, set the quantity TO user owns.
        toLookup.quantity = ownedQuantity_to;
      } else {
        // if contract did not respond, We attempt math.
        let amount = toLookup.quantity.toI32() + q.toI32();
        toLookup.quantity = new BigInt(amount);
      }
      //Check the quantity is valid:
      if (toLookup.quantity == null) {
        toLookup.quantity = new BigInt(1);
      }
      toLookup.save();
    }
  }
}

export function handleTransferSingle(event: TransferSingle): void {
  // GRab the collection. This should return a collection we have already registered.
  let collection = getCollection(event.address);
  if (collection == null) {
    // Contract is unknown.
    return;
  }
  // Value of the transaction (generally null for single transfers, and X for minted.)
  let value = event.params.value;
  if (value == null) {
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

  let userFrom = getUser(from);
  let userTo = getUser(to);
  // Set id of Collectible as `tokenId@CollectionAddress`
  let id = tokenId.toString() + "@" + collection.id;
  log.info("Id: {}", [id]);

  let collectible = getCollectible(tokenId, collection);

  let wasMinted: boolean = from == "0x0000000000000000000000000000000000000000";

  let isBurned: boolean = to == "0x0000000000000000000000000000000000000000";

  // If collectible was minted, we assign that collectible's quantity the value.
  if (wasMinted) {
    log.info("Collectible was minted: {}", [event.params.value.toString()]);
    collectible.quantity = value;
  } else if (collectible.quantity == new BigInt(0)) {
    // If not minted but collectible entity was already created and has no quantity
    // We give it a new quantity.
    log.info("Collectible has new quantity: {}", [value.toString()]);
    collectible.quantity = value;
  }
  // If collectible somehow has a lower quantity than the value traded, we set the quantity to the value.
  if (collectible.quantity < value) {
    collectible.quantity = value;
  }
  // save collectible
  collectible.save();

  log.info("Fetching contract for lookups: {}", [event.address.toHex()]);

  let contract = CollectibleContract.bind(event.address);

  // Now we create a lookup so we can find the collectibles a user (FROM and TO) owns.

  // If it was minted, the FROM address is the Zero address, therefore we don't create a lookup for it. (it won't work)
  if (wasMinted == false) {
    // I denote look-ups with the id `UserAddress:tokenId@CollectibleAddress`
    let fromLookupId = from + ":" + id;

    let fromLookup = OwnerCollectibleLookup.load(fromLookupId);
    if (fromLookup == null) {
      // Lookup doesn't exist so we create a new one.
      fromLookup = new OwnerCollectibleLookup(fromLookupId);
      fromLookup.owner = from;
      fromLookup.collection = collection.id;
      fromLookup.collectible = collectible.id;
      fromLookup.quantity = new BigInt(0);
      fromLookup.save();
    }

    log.debug("Getting balance of from: {}", [event.params.from.toHex()]);

    // We hit the contract of that collection and ask it how much the FROM user owns.
    let balFrom = contract.balanceOf(event.params.from, collectible.token_id);
    if (balFrom != null) {
      // if contract responded, set the quantity FROM user owns.
      fromLookup.quantity = balFrom;
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
    // I denote look-ups with the id `UserAddress:tokenId@CollectibleAddress`
    let toLookupId = to + ":" + id;
    // to lookup handler
    let toLookup = OwnerCollectibleLookup.load(toLookupId);
    if (toLookup == null) {
      toLookup = new OwnerCollectibleLookup(toLookupId);
      toLookup.owner = to;
      toLookup.collection = collection.id;
      toLookup.collectible = collectible.id;
      toLookup.quantity = new BigInt(0);
      toLookup.save();
    }

    // This collectible was minted and sent to this user, therefore we know the user now owns the full value.
    if (wasMinted) {
      toLookup.quantity = value;
    } else {
      // Else, we hit the contract of this collectible's collection to know how much TO owns.
      let ownedQuantity_to = contract.balanceOf(event.params.to, collectible.token_id);
      if (ownedQuantity_to != null) {
        // If replied nicely, we set the quantity that user owns for this collectible.
        toLookup.quantity = ownedQuantity_to;
      } else {
        // if contract badly responded, we attempt to do simple math and add the quantity received.
        let amount = toLookup.quantity.toI32() + value.toI32();
        toLookup.quantity = new BigInt(amount);
      }
      //Check the quantity is valid:
      if (toLookup.quantity == null) {
        toLookup.quantity = new BigInt(1);
      }
    }

    toLookup.save();
  }
}
//ignore
export function handleURI(event: URI): void {}

export function handleNewCollectionCreated(event: NewCollectionCreated): void {
  // Start indexing the collection; `event.params.collection` is the
  // address of the new collection contract

  if (isLegacyContractAddress(event.params.collection)) {
    // if it's an old collection we should not be here (old collection contract weren't made via the factory)
    return;
  }
  // Create an instance so we listen to every transactions of this contract.
  cvCollectibles.create(event.params.collection);
  let collection = new Collection(event.params.collection.toHex());
  collection.collection_id = event.params.collection_id;
  log.info("New collection created: {}, owner: {}", [
    event.params.collection.toHex(),
    event.params.owner.toHex(),
  ]);
  // Grab the user that made the collection.
  let user = getUser(event.params.owner.toHex());

  collection.owner = user.id;
  collection.save();
}

export function getCollectible(
  id: BigInt,
  collection: Collection | null
): Collectible | null {
  // Set id of Collectible as `tokenId@CollectionAddress`
  let token_id = id.toString() + "@" + collection.id;
  let collectible = Collectible.load(token_id);
  if (collectible == null) {
    // Create new Collectible Entity
    collectible = new Collectible(token_id);
    collectible.collection = collection.id;
    collectible.token_id = id;
    // Set quantity 0 (helps knowing if collectible is new)
    collectible.quantity = new BigInt(0);
  }
  return collectible;
}

export function getUser(address: string): User | null {
  // Grab a user.
  let user = User.load(address);
  if (user == null) {
    // create new user.
    user = new User(address);
    user.save();
  }
  log.info("Found user: {}", [address.toString()]);
  return user;
}

export function getCollection(address: Address): Collection | null {
  let addy = address.toHex();
  log.debug("Getting collection: {}", [addy]);
  let collection = Collection.load(addy);
  // Check if collection exists
  // If collection does not exists, we check if the address is a legacy contract (contract made by humans and not the contract factory)
  if (collection == null && isLegacyContractAddress(address)) {
    collection = new Collection(addy);
    let c = getLegacyCollection(address);

    let legacy_id = jsonToString(c.get("id"));
    let legacy_bigInt = BigInt.fromString(legacy_id);
    let legacy_owner = jsonToString(c.get("owner"));
    log.debug("legacy: {}, owner: {}", [legacy_id, legacy_owner.toString()]);
    if (c) {
      // Because this is a legacy contract
      // we create a new contract Instance on TheGRaph to listen to transferSingle, transferBatch
      cvCollectibles.create(address);
    }
    collection.collection_id = legacy_bigInt;
    collection.owner = legacy_owner.toString();
    collection.save();
  }
  if (collection) {
    log.info("Got a collection: {}", [addy]);
  }

  return collection;
}
