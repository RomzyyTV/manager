export interface TDnssecConfiguration {
  dnssecSupported: boolean;
  supportedAlgorithms?: {
    name: string;
    number: number;
  }[];
  dsData?: TDsDataInterface[];
}

export interface TDsDataInterface {
  algorithm: number;
  keyTag: string;
  keyType: string;
  publicKey: string;
  supportedAlgorithm: {
    name: string;
    number: number;
  };
}
