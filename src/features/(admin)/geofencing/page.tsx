'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface GeofenceStatus {
  active: boolean
  lat: number | null
  lng: number | null
  radius: number
}

const PRESETS = [100, 250, 500, 1000, 2000]

export default function GeofenceMap() {
  const mapRef = useRef<L.Map | null>(null)
  const circleRef = useRef<L.Circle | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const radiusRef = useRef(100)

  const [radius, setRadiusState] = useState(100)
  const [status, setStatus] = useState<GeofenceStatus>({ active: false, lat: null, lng: null, radius: 100 })
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [latInput, setLatInput] = useState('')
  const [lngInput, setLngInput] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep radiusRef in sync
  useEffect(() => {
    radiusRef.current = radius
  }, [radius])

  // Init map
  useEffect(() => {
    if (mapRef.current) return

    const map = L.map('geofence-map').setView([14.653, 121.068], 15)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    map.on('click', (e) => {
      deployGeofence(e.latlng.lat, e.latlng.lng, radiusRef.current)
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  const setRadius = (r: number) => {
    setRadiusState(r)
    radiusRef.current = r
    if (circleRef.current) circleRef.current.setRadius(r)
    setStatus((prev) => ({ ...prev, radius: r }))
  }

  const clearGeofence = () => {
    const map = mapRef.current
    if (!map) return
    if (circleRef.current) { map.removeLayer(circleRef.current); circleRef.current = null }
    if (markerRef.current) { map.removeLayer(markerRef.current); markerRef.current = null }
    setStatus({ active: false, lat: null, lng: null, radius: radiusRef.current })
    setLatInput('')
    setLngInput('')
  }

  const deployGeofence = (lat: number, lng: number, r: number) => {
    const map = mapRef.current
    if (!map) return

    clearGeofence()

    const icon = L.divIcon({
      html: `<div style="width:12px;height:12px;background:#3b82f6;border:2.5px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(59,130,246,.4);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
      className: '',
    })

    circleRef.current = L.circle([lat, lng], {
      radius: r,
      color: '#3b82f6',
      weight: 2,
      fillColor: '#3b82f6',
      fillOpacity: 0.08,
    }).addTo(map)

    markerRef.current = L.marker([lat, lng], { icon })
      .addTo(map)
      .bindPopup(
        `<strong style="color:#3b82f6">Geofence Active</strong><br>${lat.toFixed(5)}, ${lng.toFixed(5)}<br>Radius: ${r >= 1000 ? (r / 1000).toFixed(2) + ' km' : r + ' m'}`
      )
      .openPopup()

    setLatInput(lat.toFixed(6))
    setLngInput(lng.toFixed(6))
    setStatus({ active: true, lat, lng, radius: r })

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  const handleSetGeofence = () => {
    const map = mapRef.current
    if (!map) return
    const lat = parseFloat(latInput) || map.getCenter().lat
    const lng = parseFloat(lngInput) || map.getCenter().lng
    deployGeofence(lat, lng, radiusRef.current)
    map.setView([lat, lng], map.getZoom())
  }

  // Search
  const handleSearchChange = (val: string) => {
    setSearch(val)
    setShowSuggestions(false)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length < 3) { setSuggestions([]); return }
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 400)
  }

  const fetchSuggestions = async (q: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      setSuggestions(data)
      setShowSuggestions(true)
    } catch { /* silent */ }
  }

  const handleSelectSuggestion = (item: any) => {
    const lat = parseFloat(item.lat)
    const lng = parseFloat(item.lon)
    const parts = item.display_name.split(',')
    setSearch(parts[0])
    setSuggestions([])
    setShowSuggestions(false)
    mapRef.current?.setView([lat, lng], 16)
    deployGeofence(lat, lng, radiusRef.current)
  }

  const formatRadius = (r: number) => r >= 1000 ? `${(r / 1000).toFixed(2)} km` : `${r} m`
  const formatArea = (r: number) => {
    const a = Math.PI * r * r
    return a >= 1e6 ? `${(a / 1e6).toFixed(3)} km²` : `${Math.round(a)} m²`
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Geofence Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Define location zones for patient proximity detection</p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5">

          {/* Search */}
          <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-2">Search Location</p>
          <div className="flex gap-2 mb-5">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Search address, hospital, or landmark..."
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] max-h-48 overflow-y-auto">
                  {suggestions.map((item, i) => {
                    const parts = item.display_name.split(',')
                    return (
                      <div
                        key={i}
                        onMouseDown={() => handleSelectSuggestion(item)}
                        className="px-3 py-2.5 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="text-sm font-medium text-gray-900">{parts[0]}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{parts.slice(1, 3).join(',').trim()}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <button
              onClick={handleSetGeofence}
              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
              Set Geofence
            </button>
            <button
              onClick={clearGeofence}
              className="border border-gray-200 hover:border-red-300 hover:bg-red-50 text-red-500 text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              Clear
            </button>
          </div>

          {/* Radius + Coords */}
          <div className="flex gap-8 flex-wrap">
            {/* Radius */}
            <div className="flex-1 min-w-[220px]">
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-2">Geofence Radius</p>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-bold text-blue-500 tracking-tight">{radius}</span>
                <span className="text-sm text-gray-400">meters</span>
              </div>
              <input
                type="range"
                min={25} max={5000} step={25}
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex gap-1.5 mt-2.5 flex-wrap">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setRadius(p)}
                    className={`text-xs font-medium px-3 py-1 rounded-full border transition-all ${
                      radius === p
                        ? 'border-blue-400 text-blue-600 bg-blue-50 font-semibold'
                        : 'border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {p >= 1000 ? `${p / 1000} km` : `${p} m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Coords */}
            <div>
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-2">Coordinates</p>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest">Latitude</span>
                  <input
                    type="number"
                    value={latInput}
                    onChange={(e) => setLatInput(e.target.value)}
                    placeholder="14.6530"
                    step={0.0001}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-36"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest">Longitude</span>
                  <input
                    type="number"
                    value={lngInput}
                    onChange={(e) => setLngInput(e.target.value)}
                    placeholder="121.0680"
                    step={0.0001}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-36"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Header */}
        <div className="px-5 py-3 border-t border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            </svg>
            Interactive Map
            <span className="flex items-center gap-1 text-xs font-medium text-green-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              Live
            </span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
            Click on map to place geofence
          </span>
        </div>

        {/* Map */}
        <div id="geofence-map" style={{ height: '400px', width: '100%' }} />

        {/* Status Strip */}
        <div className="flex border-t border-gray-100 divide-x divide-gray-100">
          {[
            { key: 'Status', val: status.active ? 'Active' : 'Inactive', green: status.active },
            { key: 'Latitude', val: status.lat != null ? status.lat.toFixed(6) : '—' },
            { key: 'Longitude', val: status.lng != null ? status.lng.toFixed(6) : '—' },
            { key: 'Radius', val: status.active ? formatRadius(status.radius) : '—' },
            { key: 'Coverage Area', val: status.active ? formatArea(status.radius) : '—' },
          ].map(({ key, val, green }) => (
            <div key={key} className="flex-1 px-4 py-3">
              <div className="text-[10px] font-semibold text-blue-500 uppercase tracking-widest mb-1">{key}</div>
              <div className={`text-sm font-semibold ${green ? 'text-green-500' : val === '—' || val === 'Inactive' ? 'text-gray-300' : 'text-gray-900'}`}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}