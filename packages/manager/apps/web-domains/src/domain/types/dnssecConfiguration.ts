export interface TDnssecConfiguration {
  dnssecSupported: boolean;
  supportedAlgorithms?: {
    name: string;
    number: number;
  }[];
  dsRecords?: {
    algorithm: number;
    keyTag: number;
    keyType: number;
    publicKey: string;
  }[];
}
