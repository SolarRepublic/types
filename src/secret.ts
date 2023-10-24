import type {WeakAccountAddr} from './cosmos';
import type {JsonObject} from '@blake.regalia/belt';
import type {AminoMsg} from '@cosmjs/amino';


export type SecretQueryPermitConfig = {
	readonly permit_name: string;
	readonly allowed_tokens: WeakAccountAddr<'secret'>[];
	readonly permissions: string[];
};


export type SignedAminoDoc<
	h_config extends JsonObject,
	s_subtype extends string=string,
> = {
	params: h_config & {
		chain_id: string;
	};
	signature: {
		pub_key: {
			type: 'tendermint/PubKeySecp256k1';
			// value: Base64<s_subtype>;
			value: string;
		};
		// signature: Base64<s_subtype>;
		signature: string;
	};
};

export type SecretQueryPermit<
	h_config extends SecretQueryPermitConfig=SecretQueryPermitConfig,
	s_subtype extends string=string,
> = SignedAminoDoc<h_config, s_subtype>;

export type MsgQueryPermit = TypedAminoMsg<'query_permit', SecretQueryPermitConfig>;

export interface TypedAminoMsg<
	si_type extends string=string,
	g_value extends JsonObject=JsonObject,
> extends AminoMsg, JsonObject {
	readonly type: si_type;
	readonly value: g_value;
}
