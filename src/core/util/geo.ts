import { CenterZoom } from '@interfaces/geo';

export function serializeCenterZoom(centerZoom: CenterZoom) {
  if (!centerZoom) {
    return null;
  }
  return {
    longitude: centerZoom?.center?.lon,
    latitude: centerZoom?.center?.lat,
    zoom: centerZoom?.zoom,
  }
}

export function toCenterZoom(lon: number, lat: number, zoom: number): CenterZoom {
  return {
    center: { lon, lat },
    zoom,
  } as CenterZoom;
}
