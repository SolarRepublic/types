/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

/**
* Replaces ts-toolbelt's Any.Compute generic by not 'computing' primitives
*/

import type {N} from 'ts-toolbelt';

import type {If} from 'ts-toolbelt/out/Any/If';
import type {Key} from 'ts-toolbelt/out/Any/Key';
import type {BuiltIn} from 'ts-toolbelt/out/Misc/BuiltIn';
import type {Has} from 'ts-toolbelt/out/Union/Has';

import type {CosmWasmDatatype} from './cosmwasm';

/**
* 
*/
type Bypass = boolean | number | string | BuiltIn | CosmWasmDatatype;


/**
* @hidden
*/
export type ComputeRaw<
	z_thing extends any,
> = z_thing extends Function
	? z_thing
	: {
		[w_key in keyof z_thing]: z_thing[w_key]
	} & unknown;

/**
* @hidden
*/
type ReduceFlat<
	z_thing extends any,
> = z_thing extends Bypass
	? z_thing
	: z_thing extends Array<any>
		? z_thing extends Array<Record<Key, any>>
			? Array<{
				[w_key in keyof z_thing[number]]: z_thing[number][w_key]
			} & unknown>
			: z_thing
		: z_thing extends ReadonlyArray<any>
			? z_thing extends ReadonlyArray<Record<Key, any>>
				? ReadonlyArray<{
					[w_key in keyof z_thing[number]]: z_thing[number][w_key]
				} & unknown>
				: z_thing
			: ComputeRaw<z_thing>;

/**
* @hidden
*/
type ReduceDeep<
	z_thing extends any,
	as_seen = never,
	c_depth extends number = 0,
> = If<N.IsZero<c_depth>, ReduceFlat<z_thing>, N.Sub<c_depth, 1> extends infer c_subdepth
	? c_subdepth extends number
		? z_thing extends Bypass? z_thing
			: If<Has<as_seen, z_thing>, z_thing, (
				z_thing extends Array<any>
					? z_thing extends Array<Record<Key, any>>
						? z_thing extends [infer w_0]
							? [ReduceDeep<w_0, z_thing | as_seen, c_subdepth> & unknown]
							: z_thing extends [infer w_0, ...infer a_rest]
								? [ReduceDeep<w_0, z_thing | as_seen, c_subdepth> & unknown, ...ReduceDeep<a_rest, z_thing | as_seen, c_subdepth> & unknown]
								: z_thing extends Array<infer w_item>
									? (ReduceDeep<w_item, z_thing | as_seen, c_subdepth> & unknown)[]
									: z_thing
						: z_thing
					: z_thing extends ReadonlyArray<any>
						? z_thing extends ReadonlyArray<Record<Key, any>>
							? ReadonlyArray<{[K in keyof z_thing[number]]: ReduceDeep<z_thing[number][K], z_thing | as_seen, c_subdepth>} & unknown>
							: z_thing
						: {
							[w_key in keyof z_thing]: ReduceDeep<z_thing[w_key], z_thing | as_seen, c_subdepth>
						} & unknown
				)>
		: never
	: never
>;


/**
 * Force TS to load a type that has not been computed (to resolve composed
 * types that TS haven't fully resolved, for display purposes mostly).
 * @param A to compute
 * @returns `A`
 * @example
 * ```ts
 * import {A} from 'ts-toolbelt'
 *
 * type test0 = A.Compute<{x: 'x'} & {y: 'y'}> // {x: 'x', y: 'y'}
 * ```
 */
export type ReduceSafe<
	n_depth extends number,
	z_thing extends any,
> = ReduceDeep<z_thing, never, n_depth>;

