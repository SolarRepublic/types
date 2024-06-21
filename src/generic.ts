
type Subnet16 = `.${bigint}.${bigint}`;
type Subnet8 = `.${bigint}${Subnet16}`;
type OptionalPath = `${`/${string}` | ''}`;

type AnyPortAndPath = `${`:${bigint}` | ''}${OptionalPath}`;

export type LocalhostUrl = `http://${'localhost' | `127${Subnet8}`}${AnyPortAndPath}`;

export type NetworkedUrl = `http://10${Subnet8}${AnyPortAndPath}`
	| `http://192.168${Subnet16}${AnyPortAndPath}`
	| `http://192.0.0.${bigint}${AnyPortAndPath}`;

export type HttpsUrl = `https://${string}`;

export type WssUrl = `wss://${string}`;

export type SecureWebUrl = HttpsUrl | WssUrl;

export type TrustedContextUrl = HttpsUrl | LocalhostUrl | NetworkedUrl;
