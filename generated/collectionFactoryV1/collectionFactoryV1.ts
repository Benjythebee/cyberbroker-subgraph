// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewCollectionCreated extends ethereum.Event {
  get params(): NewCollectionCreated__Params {
    return new NewCollectionCreated__Params(this);
  }
}

export class NewCollectionCreated__Params {
  _event: NewCollectionCreated;

  constructor(event: NewCollectionCreated) {
    this._event = event;
  }

  get collection(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get collection_id(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class collectionFactoryV1 extends ethereum.SmartContract {
  static bind(address: Address): collectionFactoryV1 {
    return new collectionFactoryV1("collectionFactoryV1", address);
  }

  collectionsList(param0: BigInt): Address {
    let result = super.call(
      "collectionsList",
      "collectionsList(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_collectionsList(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "collectionsList",
      "collectionsList(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getCollectionFromId(_id: BigInt): Address {
    let result = super.call(
      "getCollectionFromId",
      "getCollectionFromId(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );

    return result[0].toAddress();
  }

  try_getCollectionFromId(_id: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getCollectionFromId",
      "getCollectionFromId(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getCollectionsCount(): BigInt {
    let result = super.call(
      "getCollectionsCount",
      "getCollectionsCount():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getCollectionsCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getCollectionsCount",
      "getCollectionsCount():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getIdFromCollection(_collection: Address): BigInt {
    let result = super.call(
      "getIdFromCollection",
      "getIdFromCollection(address):(uint256)",
      [ethereum.Value.fromAddress(_collection)]
    );

    return result[0].toBigInt();
  }

  try_getIdFromCollection(_collection: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getIdFromCollection",
      "getIdFromCollection(address):(uint256)",
      [ethereum.Value.fromAddress(_collection)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  launchCollection(collection_id: BigInt, _name: string): Address {
    let result = super.call(
      "launchCollection",
      "launchCollection(uint256,string):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(collection_id),
        ethereum.Value.fromString(_name)
      ]
    );

    return result[0].toAddress();
  }

  try_launchCollection(
    collection_id: BigInt,
    _name: string
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "launchCollection",
      "launchCollection(uint256,string):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(collection_id),
        ethereum.Value.fromString(_name)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddCollectionCall extends ethereum.Call {
  get inputs(): AddCollectionCall__Inputs {
    return new AddCollectionCall__Inputs(this);
  }

  get outputs(): AddCollectionCall__Outputs {
    return new AddCollectionCall__Outputs(this);
  }
}

export class AddCollectionCall__Inputs {
  _call: AddCollectionCall;

  constructor(call: AddCollectionCall) {
    this._call = call;
  }

  get _collection(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get collection_id(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class AddCollectionCall__Outputs {
  _call: AddCollectionCall;

  constructor(call: AddCollectionCall) {
    this._call = call;
  }
}

export class LaunchCollectionCall extends ethereum.Call {
  get inputs(): LaunchCollectionCall__Inputs {
    return new LaunchCollectionCall__Inputs(this);
  }

  get outputs(): LaunchCollectionCall__Outputs {
    return new LaunchCollectionCall__Outputs(this);
  }
}

export class LaunchCollectionCall__Inputs {
  _call: LaunchCollectionCall;

  constructor(call: LaunchCollectionCall) {
    this._call = call;
  }

  get collection_id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _name(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class LaunchCollectionCall__Outputs {
  _call: LaunchCollectionCall;

  constructor(call: LaunchCollectionCall) {
    this._call = call;
  }

  get collection(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetBaseURICall extends ethereum.Call {
  get inputs(): SetBaseURICall__Inputs {
    return new SetBaseURICall__Inputs(this);
  }

  get outputs(): SetBaseURICall__Outputs {
    return new SetBaseURICall__Outputs(this);
  }
}

export class SetBaseURICall__Inputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }

  get newURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetBaseURICall__Outputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
