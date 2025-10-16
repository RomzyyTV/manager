export interface TDnssecConfiguration {
  dnssecSupported: boolean;
  supportedAlgorithms?: {
    name: string;
    number: string;
  }[];
  dsData?: TDsDataInterface[];
}

export interface TDsDataInterface {
  algorithm: string;
  keyTag: string;
  keyType: string;
  publicKey: string;
  supportedAlgorithm: {
    name: string;
    number: string;
  };
}
