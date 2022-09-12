// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class UnrevealedTPLMechaPart extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save UnrevealedTPLMechaPart entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save UnrevealedTPLMechaPart entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("UnrevealedTPLMechaPart", id.toString(), this);
  }

  static load(id: string): UnrevealedTPLMechaPart | null {
    return store.get(
      "UnrevealedTPLMechaPart",
      id
    ) as UnrevealedTPLMechaPart | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get quantity(): BigInt {
    let value = this.get("quantity");
    return value.toBigInt();
  }

  set quantity(value: BigInt) {
    this.set("quantity", Value.fromBigInt(value));
  }

  get ownerLookups(): Array<string> | null {
    let value = this.get("ownerLookups");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set ownerLookups(value: Array<string> | null) {
    if (value === null) {
      this.unset("ownerLookups");
    } else {
      this.set("ownerLookups", Value.fromStringArray(value as Array<string>));
    }
  }

  get transfers(): Array<string> | null {
    let value = this.get("transfers");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set transfers(value: Array<string> | null) {
    if (value === null) {
      this.unset("transfers");
    } else {
      this.set("transfers", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class OwnerUTPLMechaPartLookup extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save OwnerUTPLMechaPartLookup entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save OwnerUTPLMechaPartLookup entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("OwnerUTPLMechaPartLookup", id.toString(), this);
  }

  static load(id: string): OwnerUTPLMechaPartLookup | null {
    return store.get(
      "OwnerUTPLMechaPartLookup",
      id
    ) as OwnerUTPLMechaPartLookup | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get UnrevealedTPLMechaPart(): string {
    let value = this.get("UnrevealedTPLMechaPart");
    return value.toString();
  }

  set UnrevealedTPLMechaPart(value: string) {
    this.set("UnrevealedTPLMechaPart", Value.fromString(value));
  }

  get quantity(): BigInt {
    let value = this.get("quantity");
    return value.toBigInt();
  }

  set quantity(value: BigInt) {
    this.set("quantity", Value.fromBigInt(value));
  }
}

export class Cyberbroker extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Cyberbroker entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Cyberbroker entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Cyberbroker", id.toString(), this);
  }

  static load(id: string): Cyberbroker | null {
    return store.get("Cyberbroker", id) as Cyberbroker | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get transferCount(): BigInt {
    let value = this.get("transferCount");
    return value.toBigInt();
  }

  set transferCount(value: BigInt) {
    this.set("transferCount", Value.fromBigInt(value));
  }

  get transfers(): Array<string> | null {
    let value = this.get("transfers");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set transfers(value: Array<string> | null) {
    if (value === null) {
      this.unset("transfers");
    } else {
      this.set("transfers", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save User entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save User entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("User", id.toString(), this);
  }

  static load(id: string): User | null {
    return store.get("User", id) as User | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get cyberbrokers(): Array<string> | null {
    let value = this.get("cyberbrokers");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set cyberbrokers(value: Array<string> | null) {
    if (value === null) {
      this.unset("cyberbrokers");
    } else {
      this.set("cyberbrokers", Value.fromStringArray(value as Array<string>));
    }
  }

  get unrevealedTPLMechaPartLookups(): Array<string> | null {
    let value = this.get("unrevealedTPLMechaPartLookups");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set unrevealedTPLMechaPartLookups(value: Array<string> | null) {
    if (value === null) {
      this.unset("unrevealedTPLMechaPartLookups");
    } else {
      this.set(
        "unrevealedTPLMechaPartLookups",
        Value.fromStringArray(value as Array<string>)
      );
    }
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transaction", id.toString(), this);
  }

  static load(id: string): Transaction | null {
    return store.get("Transaction", id) as Transaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transfersOfCyberbrokers(): Array<string> | null {
    let value = this.get("transfersOfCyberbrokers");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set transfersOfCyberbrokers(value: Array<string> | null) {
    if (value === null) {
      this.unset("transfersOfCyberbrokers");
    } else {
      this.set(
        "transfersOfCyberbrokers",
        Value.fromStringArray(value as Array<string>)
      );
    }
  }

  get transfersOfUnrevealedTPLMechaPart(): Array<string> | null {
    let value = this.get("transfersOfUnrevealedTPLMechaPart");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set transfersOfUnrevealedTPLMechaPart(value: Array<string> | null) {
    if (value === null) {
      this.unset("transfersOfUnrevealedTPLMechaPart");
    } else {
      this.set(
        "transfersOfUnrevealedTPLMechaPart",
        Value.fromStringArray(value as Array<string>)
      );
    }
  }
}

export class Transfer_Cyberbroker extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save Transfer_Cyberbroker entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer_Cyberbroker entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer_Cyberbroker", id.toString(), this);
  }

  static load(id: string): Transfer_Cyberbroker | null {
    return store.get("Transfer_Cyberbroker", id) as Transfer_Cyberbroker | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get cyberbroker(): string {
    let value = this.get("cyberbroker");
    return value.toString();
  }

  set cyberbroker(value: string) {
    this.set("cyberbroker", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Transfer_UnrevealedTPLMechaPart extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save Transfer_UnrevealedTPLMechaPart entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer_UnrevealedTPLMechaPart entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer_UnrevealedTPLMechaPart", id.toString(), this);
  }

  static load(id: string): Transfer_UnrevealedTPLMechaPart | null {
    return store.get(
      "Transfer_UnrevealedTPLMechaPart",
      id
    ) as Transfer_UnrevealedTPLMechaPart | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get UnrevealedTPLMechaPart(): string {
    let value = this.get("UnrevealedTPLMechaPart");
    return value.toString();
  }

  set UnrevealedTPLMechaPart(value: string) {
    this.set("UnrevealedTPLMechaPart", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get quantity(): BigInt {
    let value = this.get("quantity");
    return value.toBigInt();
  }

  set quantity(value: BigInt) {
    this.set("quantity", Value.fromBigInt(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
