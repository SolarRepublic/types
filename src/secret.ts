import type {SignedAminoDoc, TypedAminoMsg, WeakAccountAddr} from './cosmos';
import type {CwAccountAddr, CwBase64} from './cosmwasm';

/**
 * Specialized type for Secret addressess
 */
export type WeakSecretAccAddr = WeakAccountAddr<'secret'>;

/**
 * Specialized type for Secret addressess
 */
export type CwSecretAccAddr = CwAccountAddr<'secret'>;

/**
 * Params for SNIP-24 query permit
 */
export type Snip24QueryPermitParams = {
	readonly permit_name: string;
	readonly allowed_tokens: WeakSecretAccAddr[];
	readonly permissions: string[];
};

/**
 * A {@link TypedAminoMsg} for SNIP-24 query permits
 */
export type Snip24QueryPermitMsg = TypedAminoMsg<'query_permit', Snip24QueryPermitParams>;

/**
 * A signed SNIP-24 query permit
 */
export type Snip24QueryPermitSigned<
	g_params extends Snip24QueryPermitParams=Snip24QueryPermitParams,
	s_base64 extends string=CwBase64,
> = SignedAminoDoc<g_params, 'tendermint/PubKeySecp256k1', s_base64>;

/**
 * Params for SNIP-52 seed update
 */
export type Snip52NotificationSeedUpdateParams<
	s_addr extends WeakSecretAccAddr=CwSecretAccAddr,
	s_base64 extends string=CwBase64,
> = {
	readonly contract: s_addr;
	readonly previous_seed: s_base64;
};

/**
 * A {@link TypedAminoMsg} for SNIP-52 notification seed update
 */
export type Snip52NotificationSeedUpdateMsg = TypedAminoMsg<'notification_seed', Snip52NotificationSeedUpdateMsg>;

/**
 * A signed SNIP-52 notification seed update
 */
export type Snip52NotificationSeedUpdateSigned<
	g_params extends Snip52NotificationSeedUpdateParams=Snip52NotificationSeedUpdateParams,
	s_base64 extends string=CwBase64,
> = SignedAminoDoc<g_params, 'tendermint/PubKeySecp256k1', s_base64>;
