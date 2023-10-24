
export type LocalhostUrl = `http://localhost${`:${bigint}` | ''}${`/${string}` | ''}`;

export type HttpsUrl = `https://${string}`;

export type TrustedContextUrl = HttpsUrl | LocalhostUrl;
