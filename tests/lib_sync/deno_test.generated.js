// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 32adb27ffd08ee307b367a58fb1cfe05fd2395c4
const require = globalThis.require || globalThis.createRequire
  ? globalThis.createRequire(import.meta.url)
  : null;
let wasm;

import { add } from "./snippets/deno_test-0783d0dd1a7e0cd8/add.js";

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

const cachedTextEncoder = new TextEncoder("utf-8");

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}

const cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
 * @param {string} name
 * @returns {string}
 */
export function greet(name) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(
      name,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    const len0 = WASM_VECTOR_LEN;
    wasm.greet(retptr, ptr0, len0);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    return getStringFromWasm0(r0, r1);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(r0, r1);
  }
}

const imports = {
  __wbindgen_placeholder__: {
    __wbg_add_b9e10ce4d6e25f61: function (arg0, arg1) {
      const ret = add(arg0 >>> 0, arg1 >>> 0);
      return ret;
    },
  },
};

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 */
export async function instantiate() {
  return (await instantiateWithInstance()).exports;
}

let instanceWithExports;

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @returns {{
 *   instance: WebAssembly.Instance;
 *   exports: { greet: typeof greet }
 * }}
 */
export async function instantiateWithInstance() {
  if (instanceWithExports == null) {
    const instance = await instantiateInstance();
    wasm = instance.exports;
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    instanceWithExports = {
      instance,
      exports: { greet },
    };
  }
  return instanceWithExports;
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return instanceWithExports != null;
}

async function instantiateInstance() {
  const wasmBytes = base64decode(
    "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AAsgBUEANgIACwJAIARFDQACQCAAIAAoAhxBAnRB2ITAAGoiAigCAEcEQCAEQRBBFCAEKAIQIABGG2ogATYCACABDQEMAgsgAiABNgIAIAENAEH0h8AAQfSHwAAoAgBBfiAAKAIcd3E2AgAPCyABIAQ2AhggACgCECICBEAgASACNgIQIAIgATYCGAsgAEEUaigCACIARQ0AIAFBFGogADYCACAAIAE2AhgLC60DAQJ/IwBB4ABrIgMkACADIAI2AlAgAyABNgJMIAMgAjYCSCADQQhqIANByABqEA4gAygCCCEBIAMgAygCDCICNgIkIAMgATYCICADQQFBAhAANgIsIANBPGpBBDYCACADQQU2AjQgAyADQSxqNgI4IAMgA0EgajYCMAJAQSIQASIEBEAgA0EANgIYIAMgBDYCFCADQSI2AhAgAyADQRBqNgJEIANBAjYCXCADQQI2AlQgA0HQg8AANgJQIANBADYCSCADIANBMGo2AlggA0HEAGogA0HIAGoQBQ0BIAEgAhAZIANB0ABqIANBGGooAgA2AgAgAyADKQMQNwNIIAMgA0HIAGoQDiAAIAMpAwA3AwAgA0HgAGokAA8LAAsjAEFAaiIAJAAgAEEzNgIMIABB4IDAADYCCCAAQZSBwAA2AhQgACADQcgAajYCECAAQSRqQQI2AgAgAEEsakECNgIAIABBPGpBAjYCACAAQeCBwAA2AiAgAEEANgIYIABBAzYCNCAAIABBMGo2AiggACAAQRBqNgI4IAAgAEEIajYCMCAAQRhqQbyBwAAQFAALwwEBAn8jAEEgayIDJAACQAJAIAEgASACaiIBSw0AIAAoAgAiAkEBdCIEIAEgASAESRsiAUEIIAFBCEsbIgFBf3NBH3YhBAJAIAIEQCADQQE2AhggAyACNgIUIAMgAEEEaigCADYCEAwBCyADQQA2AhgLIAMgASAEIANBEGoQDCADKAIARQRAIAMoAgQhAiAAIAE2AgAgACACNgIEDAILIANBCGooAgAiAEGBgICAeEYNASAARQ0AAAsQEQALIANBIGokAAuMAQACfwJAAkAgAgRAAkAgAUEATgRAIAMoAggNAQwECwwCCyADKAIERQ0CIAMoAgAgARADDAMLIAAgATYCBAsgAEEIakEANgIAIABBATYCAA8LIAEQAQsiAgRAIAAgAjYCBCAAQQhqIAE2AgAgAEEANgIADwsgACABNgIEIABBCGpBATYCACAAQQE2AgALVAEBfyMAQSBrIgIkACACIAAoAgA2AgQgAkEYaiABQRBqKQIANwMAIAJBEGogAUEIaikCADcDACACIAEpAgA3AwggAkEEaiACQQhqEAUgAkEgaiQAC2EBA38CQCABKAIAIgQgASgCCCIDSwRAIAEoAgQhAgJAIANFBEAgAiAEEBlBASECDAELIAIgAxADIgJFDQILIAEgAzYCACABIAI2AgQLIAAgAzYCBCAAIAEoAgQ2AgAPCwALWAEBf0HUhMAAQdSEwAAoAgAiAUEBajYCAAJAIAFBAEgNAEGciMAAQZyIwAAoAgBBAWoiATYCACABQQJLDQAgAEVB0ITAACgCAEEASCABQQFLcnINAAALAAtGAQF/IAIgACgCACIAKAIAIAAoAggiA2tLBEAgACADIAIQCyAAKAIIIQMLIAAoAgQgA2ogASACEB0aIAAgAiADajYCCEEAC0kBAX8jAEEgayIAJAAgAEEUakEBNgIAIABBHGpBADYCACAAQciAwAA2AhAgAEHgg8AANgIYIABBADYCCCAAQQhqQdCAwAAQFAALOQACQAJ/IAJBgIDEAEcEQEEBIAAgAiABKAIQEQAADQEaCyADDQFBAAsPCyAAIANBACABKAIMEQEACzgBAn9B4IXAACgCACIBBEADQCAAQQFqIQAgASgCCCIBDQALC0GYiMAAIABB/x8gAEH/H0sbNgIAC5kCAQF/IwBBIGsiAiQAIAJBAToAGCACIAE2AhQgAiAANgIQIAJBzIHAADYCDCACQeCDwAA2AggjAEEQayIAJAAgAkEIaiIBKAIIIgJFBEAjAEEgayIAJAAgAEEMakEBNgIAIABBFGpBADYCACAAQeCDwAA2AhAgAEEANgIAIABBKzYCHCAAQeCDwAA2AhggACAAQRhqNgIIIABBqITAABAUAAsgACABKAIMNgIIIAAgATYCBCAAIAI2AgAjAEEQayIBJAAgAUEIaiAAQQhqKAIANgIAIAEgACkCADcDACABKAIAIgBBFGooAgAhAgJAAkAgAEEMaigCAA4CAAABCyACDQAgASgCBC0AEBAPAAsgASgCBC0AEBAPAAsmAAJAIABB/P///wdLDQAgAEUEQEEEDwsgABABIgBFDQAgAA8LAAseAAJA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",
  );
  const wasmModule = await WebAssembly.compile(wasmBytes);
  return WebAssembly.instantiate(wasmModule, imports);
}

function base64decode(b64) {
  const binString = atob(b64);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}
