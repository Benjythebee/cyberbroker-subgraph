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

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleMetaTransactionExecuted(
  event: MetaTransactionExecuted
): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let collection = getCollection(event.address);
  if (collection == null) {
    // Contract is unknown.
    return;
  }
  collection.owner = event.params.newOwner.toHex();
  collection.save();
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let collection = getCollection(event.address);
  if (collection == null) {
    // Contract is unknown.
    return;
  }
  let ids = event.params.ids;
  log.debug("New transferBatch, from: {}, to: {}", [
    event.params.from.toHex(),
    event.params.to.toHex(),
  ]);
  let from = event.params.from.toHex();
  let to = event.params.to.toHex();

  let userFrom = getUser(from);
  let userTo = getUser(to);

  let contract = CollectibleContract.bind(event.address);

  let values = event.params.values;
  log.debug("Starting loop of batch", []);
  for (let index = 0; index < ids.length; index++) {
    let id = ids[index];
    let token_id = id.toString() + "@" + collection.id;
    let q = values[index];

    let collectible = getCollectible(id, collection);

    if (collectible.quantity == new BigInt(0)) {
      collectible.quantity = q;
    }

    if (collectible.quantity < q) {
      collectible.quantity = q;
    }

    let wasMinted: boolean =
      userFrom.id == "0x0000000000000000000000000000000000000000";

    let isBurned: boolean =
      userTo.id == "0x0000000000000000000000000000000000000000";

    if (wasMinted == false) {
      // Lookups management
      // From lookup handler
      let fromLookup = OwnerCollectibleLookup.load(from + ":" + token_id);
      if (fromLookup == null) {
        fromLookup = new OwnerCollectibleLookup(from + ":" + token_id);
        fromLookup.owner = from;
        fromLookup.collection = collection.id;
        fromLookup.collectible = token_id.toString();
      }

      fromLookup.quantity = contract.balanceOf(event.params.to, id);
      fromLookup.save();
    }

    if (isBurned == false) {
      // to lookup handler
      let toLookup = OwnerCollectibleLookup.load(to + ":" + token_id);
      if (toLookup == null) {
        toLookup = new OwnerCollectibleLookup(to + ":" + token_id);
        toLookup.owner = to;
        toLookup.collection = collection.id;
        toLookup.collectible = id.toString();
      }

      toLookup.quantity = contract.balanceOf(event.params.to, id);
      toLookup.save();
    }

    collectible.save();
  }
}

export function handleTransferSingle(event: TransferSingle): void {
  let collection = getCollection(event.address);
  if (collection == null) {
    // Contract is unknown.
    return;
  }

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
  let id = event.params.id;
  let from = event.params.from.toHex();
  let to = event.params.to.toHex();

  let userFrom = getUser(from);
  let userTo = getUser(to);

  let token_id = id.toString() + "@" + collection.id;
  log.info("Token Id: {}", [token_id]);

  let collectible = getCollectible(id, collection);

  let wasMinted: boolean =
    userFrom.id == "0x0000000000000000000000000000000000000000";

  let isBurned: boolean =
    userTo.id == "0x0000000000000000000000000000000000000000";

  if (wasMinted) {
    log.info("Collectible was minted: {}", [event.params.value.toString()]);
    collectible.quantity = value;
  } else if (collectible.quantity == new BigInt(0)) {
    log.info("Collectible has new quantity: {}", [value.toString()]);
    collectible.quantity = value;
  }

  if (collectible.quantity < value) {
    collectible.quantity = value;
  }

  collectible.save();

  log.info("Fetching contract for lookups: {}", [event.address.toHex()]);

  let contract = CollectibleContract.bind(event.address);

  if (wasMinted == false) {
    let fromLookupId = from + ":" + token_id;
    // From lookup handler
    let fromLookup = OwnerCollectibleLookup.load(fromLookupId);
    if (fromLookup == null) {
      fromLookup = new OwnerCollectibleLookup(fromLookupId);
      fromLookup.owner = from;
      fromLookup.collection = collection.id;
      fromLookup.collectible = collectible.id;
    }

    log.debug("Getting balance from: {}", [event.params.from.toHex()]);
    let balFrom = contract.balanceOf(event.params.from, collectible.token_id);
    fromLookup.quantity = balFrom;

    fromLookup.save();
  }

  if (isBurned == false) {
    let toLookupId = to + ":" + token_id;
    // to lookup handler
    let toLookup = OwnerCollectibleLookup.load(toLookupId);
    if (toLookup == null) {
      toLookup = new OwnerCollectibleLookup(toLookupId);
      toLookup.owner = to;
      toLookup.collection = collection.id;
      toLookup.collectible = collectible.id;
    }

    let balTo = contract.balanceOf(event.params.to, collectible.token_id);

    toLookup.quantity = balTo;

    toLookup.save();
  }
}

export function handleURI(event: URI): void {}

export function handleNewCollectionCreated(event: NewCollectionCreated): void {
  // Start indexing the collection; `event.params.collection` is the
  // address of the new collection contract

  if (isLegacyContractAddress(event.params.collection)) {
    // if it's an old collection we should not be here (old collection contract weren't made via the factory)
    return;
  }

  cvCollectibles.create(event.params.collection);
  let collection = new Collection(event.params.collection.toHex());
  collection.collection_id = event.params.collection_id;
  log.info("New collection created: {}, owner: {}", [
    event.params.collection.toHex(),
    event.params.owner.toHex(),
  ]);
  let user = getUser(event.params.owner.toHex());

  collection.owner = user.id;
  collection.save();
}

export function getCollectible(
  id: BigInt,
  collection: Collection | null
): Collectible | null {
  let token_id = id.toString() + "@" + collection.id;
  let collectible = Collectible.load(token_id);
  if (collectible == null) {
    collectible = new Collectible(token_id);
    collectible.collection = collection.id;
    collectible.token_id = id;
    collectible.quantity = new BigInt(0);
  }
  return collectible;
}

export function getUser(address: string): User | null {
  let user = User.load(address);
  if (user == null) {
    user = new User(address);
    log.info("New user: {}", [address.toString()]);
    user.save();
  }
  log.info("Found user: {}", [address.toString()]);
  return user;
}

export function getCollection(address: Address): Collection | null {
  let addy = address.toHex();
  log.debug("Getting collection: {}", [addy]);
  let collection = Collection.load(addy);
  if (collection == null && isLegacyContractAddress(address)) {
    collection = new Collection(addy);
    let c = getLegacyCollection(address);

    let legacy_id = jsonToString(c.get("id"));
    let legacy_bigInt = BigInt.fromString(legacy_id);
    let legacy_owner = jsonToString(c.get("owner"));
    log.debug("legacy: {}, owner: {}", [legacy_id, legacy_owner.toString()]);
    if (c) {
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
