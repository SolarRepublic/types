import type {CwBase64, CwUint128, CwHexLower} from './cosmwasm';

declare module '@blake.regalia/belt' {
	function bytes_to_hex(atu8_bytes: Uint8Array): CwHexLower;
	function text_to_base64(s_text: string): CwBase64;
	function bytes_to_base64(atu8_bytes: Uint8Array): CwBase64;
	function bytes_to_base64_slim(atu8_bytes: Uint8Array): CwBase64;
}

declare module 'bignumber.js' {
	interface BigNumber {
		toFixed(n_dp: 0, xc_rounding?: number): CwUint128;
	}
}
