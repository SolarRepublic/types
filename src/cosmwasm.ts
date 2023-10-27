/* eslint-disable @typescript-eslint/naming-convention */

import type {WeakAccountAddr, WeakValidatorAddr} from './cosmos';

// actual es type
// export declare const ES_TYPE: unique symbol;
export declare const ES_TYPE: 'ES_TYPE';

// helps discriminate between datatypes that are otherwise equivalent
// export declare const ES_CLARIFIER: unique symbol;
export declare const ES_CLARIFIER: 'ES_CLARIFIER';

// how to represent in rust
// export declare const RUST_TYPE: unique symbol;
export declare const RUST_TYPE: 'RUST_TYPE';

// defines how to import the symbol in rust
export type RustImport = {
	crate: string;
	symbol: string;
};

type FromCosmWasm<s_symbol extends string> = {
	crate: 'cosmwasm_std';
	symbol: s_symbol;
};


/**
 * Creates a strong subtype for data that is bound for or returned from a smart contract.
 */
export type CosmWasmDatatype<
	w_es_type=unknown,
	s_rust extends string|RustImport=string|RustImport,
	s_clarifier extends string=string,
> = string extends s_clarifier
	? {
		[ES_TYPE]: w_es_type;
		[RUST_TYPE]: s_rust;
	} & w_es_type
	: {
		[ES_CLARIFIER]?: s_clarifier;
		[ES_TYPE]: w_es_type;
		[RUST_TYPE]: s_rust;
	} & w_es_type;

// ({
// 	[ES_TYPE]: w_es_type;
// 	[RUST_TYPE]: s_rust;
// } & (string extends s_clarifier
// 	? {
// 		[ES_CLARIFIER]: s_clarifier;
// 	}
// 	: {}
// )) & w_es_type;

// https://github.com/CosmWasm/cosmwasm/blob/main/docs/MESSAGE_TYPES.md

/**
 * 8-bit signed integer
 */
export type CwInt8<n_amount extends number=number>= CosmWasmDatatype<n_amount, 'i8'>;

/**
 * 16-bit signed integer
 */
export type CwInt16<n_amount extends number=number> = CosmWasmDatatype<n_amount, 'i16'>;

/**
 * 32-bit signed integer
 */
export type CwInt32<n_amount extends number=number> = CosmWasmDatatype<n_amount, 'i32'>;

/**
 * 64-bit signed integer as a string or bigint
 */
export type CwInt64<
	z_amount extends bigint|`${bigint}`=`${bigint}`,
> = CosmWasmDatatype<z_amount extends bigint? `${z_amount}`: z_amount, FromCosmWasm<'Int64'>>;

/**
 * 128-bit signed integer as a string or bigint
 */
export type CwInt128<
	z_amount extends bigint|`${bigint}`=bigint,
> = CosmWasmDatatype<z_amount extends bigint? `${z_amount}`: z_amount, FromCosmWasm<'Int128'>>;


/**
 * 8-bit unsigned integer
 */
export type CwUint8<n_amount extends number=number>= CosmWasmDatatype<n_amount, 'u8'>;

/**
 * 16-bit unsigned integer
 */
export type CwUint16<n_amount extends number=number> = CosmWasmDatatype<n_amount, 'u16'>;

/**
 * 32-bit usigned integer
 */
export type CwUint32<n_amount extends number=number> = CosmWasmDatatype<n_amount, 'u32'>;

/**
 * 64-bit unsigned integer as a string or bigint
 */
export type CwUint64<
	z_amount extends bigint|`${bigint}`=`${bigint}`,
> = CosmWasmDatatype<z_amount extends bigint? `${z_amount}`: z_amount, FromCosmWasm<'Uint64'>>;

/**
 * 128-bit unsigned integer as a string or bigint
 */
export type CwUint128<
	z_amount extends bigint|`${bigint}`=bigint,
> = CosmWasmDatatype<z_amount extends bigint? `${z_amount}`: z_amount, FromCosmWasm<'Uint128'>>;



/**
 * Base64-encoded bytes
 */
// workaround for https://github.com/microsoft/TypeScript/issues/37888
export type CwBase64<s_subtype extends string=string> = CosmWasmDatatype<s_subtype, FromCosmWasm<'Binary'>>;


type HexLowerChar = `${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'}`;
type HexLowerByte = `${HexLowerChar}${HexLowerChar}`;
type HexLowerShort = `${HexLowerByte}${HexLowerByte}`;

type HexUpperChar = `${'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'}`;
type HexUpperByte = `${HexUpperChar}${HexUpperChar}`;
type HexUpperShort = `${HexUpperByte}${HexUpperByte}`;

interface HexMethods {
	toLowerCase(): CwHexLower;
	toUpperCase(): CwHexUpper;
}

interface HexLowerMethods extends HexMethods {
	concat(...a_lowers: CwHexLower[]): CwHexLower;
	concat(...a_uppers: (CwHexUpper | CwHexMixed)[]): CwHexMixed;
	charAt(i_pos: number): '' | HexLowerChar;
}

interface HexUpperMethods extends HexMethods {
	concat(...a_uppers: CwHexUpper[]): CwHexUpper;
	concat(...a_lowers: (CwHexLower | CwHexMixed)[]): CwHexMixed;
	charAt(i_pos: number): ''| HexUpperChar;
}


/**
 * Hexadecimal-encoded bytes in lowercase
 */
export type CwHexLower<s_subtype extends string=string> = CosmWasmDatatype<HexLowerMethods & s_subtype, FromCosmWasm<'HexBinary'>, 'hex-lower'>;

/**
 * Hexadecimal-encoded bytes in uppercase
 */
export type CwHexUpper<s_subtype extends string=string> = CosmWasmDatatype<HexUpperMethods & s_subtype, FromCosmWasm<'HexBinary'>, 'hex-upper'>;

/**
 * Hexadecimal-encoded bytes in mixed case
 */
export type CwHexMixed<s_subtype extends string=string> = CosmWasmDatatype<HexMethods & s_subtype, FromCosmWasm<'HexBinary'>, 'hex-lower' | 'hex-upper'>;


/**
 * A unix timestamp value intended exchanged with a smart contract
 */
export type CwTimestamp<
	z_time extends bigint|`${bigint}`=`${bigint}`,
> = CosmWasmDatatype<z_time extends bigint? `${z_time}`: z_time, FromCosmWasm<'Timestamp'>>;


/**
 * JSON serialization of a `cosmos.base.v1beta1.Coin` value exchanged with a smart contract
 */
export type CwCoin<
	s_denom extends string=string,
> = CosmWasmDatatype<{
	readonly denom: s_denom;
	readonly amount: CwUint128;
}, FromCosmWasm<'Coin'>>;

/**
 * Base64-encoded CBOR exchanged with a smart contract
 */
export type CwCborBase64<s_subtype extends string=CwBase64> = CosmWasmDatatype<s_subtype, 'String', 'cbor'>;


export type CwAccountAddr = CosmWasmDatatype<WeakAccountAddr>;


export type CwValidatorAddr = CosmWasmDatatype<WeakValidatorAddr>;

