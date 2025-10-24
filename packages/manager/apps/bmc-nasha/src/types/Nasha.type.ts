export interface NashaService extends Record<string, unknown> {
  serviceName: string;
  customName?: string;
  datacenter: string;
  diskType: string;
  canCreatePartition: boolean;
  monitored: boolean;
  zpoolCapacity: string;
  zpoolSize: string;
}
