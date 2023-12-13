import type {
	CwUint128,
	CwUint16,
	CwUint32,
	CwUint64,
	CosmWasmDatatype,  // eslint-disable-line @typescript-eslint/no-unused-vars
} from './cosmwasm';
import type {ReduceSafe} from './reduce';
import type {ES_TYPE, JsonObject, TYPE_ID} from '@blake.regalia/belt';

/**
 * Namespace offering utility types for adjusting the strength of declared datatypes.
 * 
 * Utilities:
 *  - {@link Datatypes.Weaken}
 */
export namespace Datatypes {
	export type Strength = 'weakest' | 'mild' | 'strongest';

	type MetaDescriptor = {
		[TYPE_ID]?: any;
		[ES_TYPE]: any;
	};

	type WeakenDatatype<
		g_datatype extends MetaDescriptor,
		s_strength extends Strength,
	> = g_datatype extends {[ES_TYPE]: infer w_scalar}
		? {
			weakest: w_scalar extends string
				? string
				: w_scalar extends number
					? number
					: w_scalar extends boolean
						? boolean
						: w_scalar;
			mild: w_scalar;
			strongest: g_datatype;
		}[s_strength]
		: never;

	type WeakenValue<
		w_value,
		s_strength extends Strength,
	> = w_value extends MetaDescriptor
		? WeakenDatatype<w_value, s_strength>
		: w_value extends [infer w0]
			? [WeakenValue<w0, s_strength>]
			: w_value extends [infer w0, ...infer a_rest]
				? [WeakenValue<w0, s_strength>, ...WeakenValue<a_rest, s_strength>]
				: w_value extends Array<infer w_items>
					? WeakenValue<w_items, s_strength>[]
					: w_value extends JsonObject
						? WeakenObject<w_value, s_strength>
						: w_value;

	type WeakenObject<
		h_obj extends JsonObject,
		s_strength extends Strength,
	> = {
		[si_key in keyof h_obj]: WeakenValue<h_obj[si_key], s_strength>;
	};

	/**
	 * Weaken the given Datatype, created using one of: {@link CosmWasmDatatype}
	 * 
	 * For example:
	 * ```
	 * type Subject = {foo: Uint128};
	 * 
	 * type Strongest = Datatypes.Weaken<Subject, 'strongest'>;  // {foo: Uint128}
	 * type Mild      = Datatypes.Weaken<Subject, 'mild'>;       // {foo: `${bigint}`}
	 * type Weakest   = Datatypes.Weaken<Subject, 'weakest'>;    // {foo: string}
	 * ```
	 */
	export type Weaken<
		h_obj extends JsonObject,
		s_strength extends Strength='weakest',
	> = ReduceSafe<10, WeakenObject<h_obj, s_strength>>;

	// type test = Weaken<{
	// 	data: {
	// 		a: string;
	// 		b: 'yes';
	// 		d: Uint128[];
	// 		f: [Uint16];
	// 		e: [Uint32, Uint64];
	// 		g: [Uint32, Uint64, Uint128];
	// 	};
	// }, 'mild'>;
}

