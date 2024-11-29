import type {TrustedContextUrl} from './generic';
import type {Dict} from '@blake.regalia/belt';

/**
 * Describes a request to some URL with partial options to use with each request
 */
export type RequestPattern<p_urls extends string=never> = (TrustedContextUrl | p_urls) | ({
	/**
	 * URL of the target
	 */
	url: TrustedContextUrl | p_urls;

	/**
	 * Optional headers to send with LCD requests
	 */
	headers?: Dict;

	/**
	 * Optional redirect behavior
	 */
	redirect?: RequestInit['redirect'];

	/**
	 * Optional {@link AbortSignal} to use to control the connection
	 */
	signal?: AbortSignal;
});

/**
 * Canonical form of an opaque remote service
 */
export type RemoteServiceFetcher = (sr_path: string, g_init?: RequestInit) => Promise<Response>;

/**
 * Describes a pattern of requests to some remote service with partial options to use with each request
 */
export type RemoteServiceDescriptor<p_urls extends string=never> = ({
	/**
	 * Base URL of the remote service
	 */
	origin: TrustedContextUrl | p_urls;

	/**
	 * Optional headers to send with LCD requests
	 */
	headers?: Dict;

	/**
	 * Optional redirect behavior
	 */
	redirect?: RequestRedirect;

	/**
	 * Optional fetcher to override processing of requests
	 */
	fetch?: RemoteServiceFetcher;
});
