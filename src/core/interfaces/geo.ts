export interface LonLat {
  lon: number;
  lat: number;
}

export interface CenterZoom {
  center: LonLat;
  zoom: number;
}

export interface PaddingOption {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
