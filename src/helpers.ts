import {
  Address,
  JSONValue,
  JSONValueKind,
  log,
  TypedMap,
} from "@graphprotocol/graph-ts";
import { arrayOfBytess, LEGACY_ADDRESSES } from "./constant";

export function isLegacyContractAddress(value: Address): boolean {
  return LEGACY_ADDRESSES.indexOf(value.toHex()) >= 0;
}

export function getLegacyCollection(
  address: Address
): TypedMap<string, JSONValue> {
  let p: TypedMap<string, JSONValue>;
  for (let i = 0; i < arrayOfBytess.length; i++) {
    let object = arrayOfBytess[i].toObject();
    let addy = object.get("address")
    if (toLowerCase(jsonToString(addy)) == address.toHex()) {
      p = object;
    }
  }
  return p;
}

export function toLowerCase(value: String): string {
  let newAddress: string = "";
  for (let i = 0; i < value.length; i++) {
    let letter: string = value[i];
    let ascii = value.charCodeAt(i);
    if (ascii >= 65 && ascii <= 90) {
      newAddress += String.fromCharCode(ascii + 32);
    } else {
      newAddress += letter;
    }
  }
  return newAddress;
}

export function jsonToString(val: JSONValue | null): string {
  if (val != null && val.kind === JSONValueKind.STRING) {
    return val.toString();
  }
  return "";
}
