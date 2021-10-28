import {
  Address,
  JSONValue,
  JSONValueKind,
  log,
  TypedMap,
} from "@graphprotocol/graph-ts";
import { arrayOfBytess } from "./constant";


export function getLegacyCollection(
  address: Address
): TypedMap<string, JSONValue>|null {
  let p: TypedMap<string, JSONValue>|null = null;
  for (let i = 0; i < arrayOfBytess.length; i++) {
    let object = arrayOfBytess[i].toObject();
    let addy = object.get("address")
    if (jsonToString(addy) == address.toHex()) {
      p = object;
    }
  }
  return p;
}

export function jsonToString(val: JSONValue | null): string {
  if (val != null && val.kind === JSONValueKind.STRING) {
    return val.toString();
  }
  return "";
}
