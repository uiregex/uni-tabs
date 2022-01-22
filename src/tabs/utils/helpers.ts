import {isJSON, isString} from "@uiwebkit/common";

import {UniStoreType, UniTabsValue} from "../models";

export function getPathId(type: UniStoreType): string {
  return type === 'memory' ? 'uni-' + Math.random().toString(9).substring(15) : 'uni';
}

export function parseValue(value: string | UniTabsValue): UniTabsValue {
  return isString(value) && isJSON(value) ? JSON.parse(value) : [...value];
}
