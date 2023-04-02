export interface RedirectInfo {
    label: string,
    path: string,
    icon?: string
}
export interface Occupancy {
    idx: number;
    label: string;
    subLabel?: string;
    value: number;
    childOptions?: string[];
    add(occupancy: Occupancy): void;
    remove(occupancy: Occupancy): void;
  }