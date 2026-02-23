'use client';

import { useEffect, useMemo, useRef } from 'react';
import mapboxgl, { LngLatBounds } from 'mapbox-gl';
import { MAPBOX_FALLBACK_CENTER, MAPBOX_STYLE, MAPBOX_TOKEN } from '@/lib/mapbox/config';
import { MarkerType } from '@/lib/mapbox/types';

export default function CustomMap({ markers }: { markers: MarkerType[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRefs = useRef<mapboxgl.Marker[]>([]);

  const bounds = useMemo(() => {
    if (markers.length === 0) return null;
    const b = new LngLatBounds();
    for (const m of markers) b.extend([m.lng, m.lat]); // Mapbox usa [lng, lat]
    return b;
  }, [markers]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    if (!MAPBOX_TOKEN) {
      console.error('Missing NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN');
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      center: MAPBOX_FALLBACK_CENTER,
      zoom: 11,
      attributionControl: false,
    });

    mapRef.current = map;

    return () => {
      markerRefs.current.forEach((m) => m.remove());
      markerRefs.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markerRefs.current.forEach((m) => m.remove());
    markerRefs.current = [];

    for (const m of markers) {
      const el = document.createElement('div');
      el.style.width = '28px';
      el.style.height = '28px';
      el.style.backgroundImage = 'url(/assets/marker.svg)';
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';

      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([m.lng, m.lat])
        .addTo(map);

      markerRefs.current.push(marker);
    }

    if (bounds) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 14, duration: 0 });
    }
  }, [markers, bounds]);

  useEffect(() => {
    const map = mapRef.current;
    const el = containerRef.current;
    if (!map || !el) return;

    const ro = new ResizeObserver(() => {
      map.resize();
      if (bounds) map.fitBounds(bounds, { padding: 60, maxZoom: 14, duration: 0 });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [bounds]);

  return <div ref={containerRef} className="h-full w-full" />;
}
