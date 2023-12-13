import type {IntStr} from '@blake.regalia/belt';

/**
 * Any sized int as a string
 */
export type WeakIntStr = IntStr;

/**
 * Any sized uint as a string (alias of {@link WeakIntStr})
 */
export type WeakUintStr = WeakIntStr;

/**
 * 128-bit int as a string (alias of {@link WeakIntStr})
 */
export type WeakInt128Str = WeakIntStr;

/**
 * 128-bit uint as a string (alias of {@link WeakUintStr})
 */
export type WeakUint128Str = WeakUintStr;

/**
 * 64-bit int as a string (alias of {@link WeakIntStr})
 */
export type WeakInt64Str = WeakIntStr;

/**
 * 64-bit uint as a string (alias of {@link WeakUintStr})
 */
export type WeakUint64Str = WeakUintStr;



/**
 * Known Cosmos-wide address space modifiers
 */
export type CosmosAddrSpace =
	| ''
	| 'valoper'
	| 'valcons';

/**
 * A Cosmos bech32-encoded address
 */
export type WeakBech32Addr<
	s_hrp extends string=string,
	s_space extends CosmosAddrSpace=CosmosAddrSpace,
> = `${s_hrp}${s_space}1${string}`;

/**
 * A Cosmos bech32-encoded pubkey
 */
export type WeakBech32Pub<
	s_prefix extends string=string,
	s_space extends CosmosAddrSpace=CosmosAddrSpace,
> = `${s_prefix}${s_space}pub1${string}`;

/**
 * A Cosmos bech32-encoded account address
 */
export type WeakAccountAddr<
	s_hrp extends string=string,
> = WeakBech32Addr<s_hrp, ''>;

/**
 * A Cosmos bech32-encoded validator address
 */
export type WeakValidatorAddr<
	s_hrp extends string=string,
> = WeakBech32Addr<s_hrp, 'valoper'>;


/**
 * Concisely represents a `cosmos.base.v1beta1.Coin`
 */
export type SlimCoin<
	s_denom extends string=string,
> = readonly [
	sg_amount: WeakUint128Str,
	s_denom: s_denom,
];

