// src/app/local/page.js
'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import "../../app/globals.css"
import "../../app/localizacao.css"

export default function Local() {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const scriptLoaded = useRef(false);

  // 1. Obter localização do usuário
  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          setError("Permissão de localização negada. Mostrando hospitais em São Paulo.");
          setLoading(false);
          setUserLocation({ lat: -23.5505, lng: -46.6333 });
        },
        { timeout: 10000 }
      );
    } else {
      setError("Seu navegador não suporta geolocalização. Mostrando hospitais em São Paulo.");
      setLoading(false);
      setUserLocation({ lat: -23.5505, lng: -46.6333 });
    }
  };

  // 2. Carregar API do Google Maps apenas uma vez
  useEffect(() => {
    getUserLocation();

    return () => {
      // Limpeza ao desmontar o componente
      if (window.google && scriptLoaded.current) {
        delete window.google;
        scriptLoaded.current = false;
      }
    };
  }, []);

  // 3. Inicializar mapa quando a localização estiver disponível
  useEffect(() => {
    if (!userLocation || mapRef.current) return;

    const loadMap = () => {
      if (!window.google) {
        if (!scriptLoaded.current) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.id = 'google-maps-script';
          script.onload = initializeMap;
          script.onerror = () => {
            setError("Falha ao carregar o Google Maps.");
            setLoading(false);
          };
          document.head.appendChild(script);
          scriptLoaded.current = true;
        }
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current || !window.google || !window.google.maps) return;

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 14
      });

      // Marcador da localização do usuário
      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Sua localização",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });

      // Buscar hospitais
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: userLocation,
        radius: 5000,
        type: 'hospital'
      }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setHospitals(results);
          
          results.forEach(place => {
            new window.google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              }
            });
          });
        }
        setLoading(false);
      });

      mapRef.current = map;
    };

    loadMap();
  }, [userLocation]);

  return (
    <div className="container">
      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/local">Localização</Link>
          <Link href="/sobre">Sobre</Link>
          <img src="/logo.png" alt="Logo" />
        </nav>
      </header>
      
      <main>
        <h1 className="titulo-local">Hospitais mais próximos de você</h1>
        
        {loading && <div className="loading">Carregando mapa...</div>}
        {error && <div className="error">{error}</div>}

        <div id="map" style={{ 
          height: '500px', 
          width: '70%',
          borderRadius:'8px',
        }}></div>

        {!loading && hospitals.length > 0 && (
          <div className="hospitals-list">
            <h2>Hospitais encontrados:</h2>
            <ul>
              {hospitals.map((hospital, index) => (
                <li key={index}>
                  <h3>{hospital.name}</h3>
                  <p>{hospital.vicinity}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      
      <footer>
        <p>© {new Date().getFullYear()} Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
