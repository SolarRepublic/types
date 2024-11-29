import type {CwAccountAddr, CwBase64, CwUint128} from './cosmwasm';
import type {IntStr, JsonObject} from '@blake.regalia/belt';
import type {AminoMsg, AminoSignResponse, Coin, Pubkey, StdFee, StdSignature, StdSignDoc, StdTx} from '@cosmjs/amino';

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


/**
 * For compatibility with Cosmos' {@link Coin}
 */
export interface TypedCoin<
	s_u128 extends string=CwUint128,
> extends Coin, JsonObject {
	readonly amount: s_u128;
}

/**
 * For compatibility with Cosmos' {@link PubKey}
 */
export interface TypedPubKey<
	s_type extends string=string,
	s_base64 extends string=CwBase64,
> extends Pubkey, JsonObject {
	readonly type: s_type;
	readonly value: s_base64;
}

/**
 * For compatibility with Cosmos' {@link StdSignature}
 */
export interface TypedStdSignature<
	s_type extends string=string,
	s_base64 extends string=CwBase64,
> extends StdSignature, JsonObject {
	readonly pub_key: TypedPubKey<s_type, s_base64>;
	readonly signature: s_base64;
}

/**
 * For compatibility with Cosmos' {@link StdFee}
 */
export interface TypedStdFee<
	s_u128 extends string=CwUint128,
	s_addr extends WeakAccountAddr=CwAccountAddr,
> extends StdFee, JsonObject {
	readonly amount: TypedCoin<s_u128>[];
	readonly gas: s_u128;
	readonly granter?: s_addr;
	readonly payer?: s_addr;
}

/**
 * For compatibility with Cosmos' {@link AminoMsg}
 */
export interface TypedAminoMsg<
	si_type extends string=string,
	g_value extends JsonObject=JsonObject,
> extends AminoMsg, JsonObject {
	readonly type: si_type;
	readonly value: g_value;
}

/**
 * For compatibility with Cosmos' {@link StdSignDoc}
 */
export interface TypedStdSignDoc<
	a_msgs extends readonly TypedAminoMsg<string, JsonObject>[]=TypedAminoMsg[],
	s_u128 extends string=CwUint128,
	g_fee extends TypedStdFee<string, WeakAccountAddr>=TypedStdFee,
> extends StdSignDoc, JsonObject<a_msgs> {
	readonly chain_id: string;
	readonly account_number: s_u128;
	readonly sequence: s_u128;
	readonly fee: g_fee;
	readonly msgs: a_msgs;
}

/**
 * ADR-036 sign data
 */
export type Adr036MsgSignData<
	s_addr extends WeakAccountAddr=CwAccountAddr,
	s_base64 extends string=CwBase64,
> = TypedAminoMsg<'sign/MsgSignData', {
	readonly signer: s_addr;
	readonly data: s_base64;
}>;

/**
 * ARD-036 sign document
 */
export interface Adr036SignDoc<
	s_addr extends WeakAccountAddr=CwAccountAddr,
	s_base64 extends string=CwBase64,
> extends TypedStdSignDoc, JsonObject<TypedAminoMsg[]> {
	readonly chain_id: '';
	readonly account_number: CwUint128<'0'>;
	readonly sequence: CwUint128<'0'>;
	readonly fee: {
		readonly gas: CwUint128<'0'>;
		readonly amount: [];
	};
	readonly msgs: [Adr036MsgSignData<s_addr, s_base64>];
	readonly memo: '';
}

/**
 * For compatibility with Cosmos' {@link AminoSignResponse}
 */
export interface TypedAminoSignResponse<
	a_msgs extends readonly TypedAminoMsg<string, JsonObject>[]=TypedAminoMsg[],
	s_u128 extends string=CwUint128,
	g_fee extends TypedStdFee<string, WeakAccountAddr>=TypedStdFee,
	s_base64 extends string=CwBase64,
> extends AminoSignResponse, JsonObject<a_msgs> {
	readonly signed: TypedStdSignDoc<a_msgs, s_u128, g_fee>;
	readonly signature: TypedStdSignature<s_base64>;
}

/**
 * For compatibility with Cosmos' {@link StdTx}
 */
export interface TypedStdTx<
	a_msgs extends readonly TypedAminoMsg<string, JsonObject>[]=readonly TypedAminoMsg[],
	g_fee extends TypedStdFee<string, WeakAccountAddr>=TypedStdFee,
	a_sigs extends readonly TypedStdSignature<string, string>[]=readonly TypedStdSignature[],
> extends StdTx, JsonObject<a_msgs | a_sigs> {
	readonly msg: a_msgs;
	readonly fee: g_fee;
	readonly signatures: a_sigs;
	readonly memo: string | undefined;
}

/**
 * Typed cosmos-sdk/StdTx
 */
export type AminoTx<
	g_ext extends JsonObject=JsonObject,
	a_msgs extends readonly TypedAminoMsg<string, JsonObject>[]=readonly TypedAminoMsg[],
	g_fee extends TypedStdFee<string, WeakAccountAddr>=TypedStdFee,
	a_sigs extends readonly TypedStdSignature<string, string>[]=readonly TypedStdSignature[],
> = TypedAminoMsg<'cosmos-sdk/StdTx', g_ext & TypedStdTx<a_msgs, g_fee, a_sigs>>;

/**
 * Signed version of {@link AminoTx}
 */
export type SignedAminoTx<
	s_type extends string=string,
	s_base64 extends string=CwBase64,
	a_msgs extends readonly TypedAminoMsg<string, JsonObject>[]=readonly TypedAminoMsg[],
	g_fee extends TypedStdFee<string, WeakAccountAddr>=TypedStdFee,
	a_sigs extends readonly TypedStdSignature<string, string>[]=readonly TypedStdSignature<string, s_base64>[],
> = AminoTx<{
	signatures: TypedStdSignature<s_type, s_base64>;
}, a_msgs, g_fee, a_sigs>;

/**
 * A signed Amino doc for CosmWasm verification
 */
export interface SignedAminoDoc<
	h_params extends JsonObject=JsonObject,
	s_base64 extends string=CwBase64,
> extends JsonObject {
	readonly params: h_params & {
		readonly chain_id: string;
	};
	readonly signature: TypedStdSignature<s_base64>;
}
