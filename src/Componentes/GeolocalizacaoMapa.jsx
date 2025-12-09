import { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix do ícone do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function GeolocalizacaoMapa() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [coordenadas, setCoordenadas] = useState({
    origemLat: '',
    origemLng: '',
    destinoLat: '',
    destinoLng: ''
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([-22.8747, -47.0655], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const validarCoordenadas = () => {
    const temp = {};
    
    if (!coordenadas.origemLat.trim()) {
      temp.origemLat = 'Latitude de origem é obrigatória';
    }
    if (!coordenadas.origemLng.trim()) {
      temp.origemLng = 'Longitude de origem é obrigatória';
    }
    if (!coordenadas.destinoLat.trim()) {
      temp.destinoLat = 'Latitude de destino é obrigatória';
    }
    if (!coordenadas.destinoLng.trim()) {
      temp.destinoLng = 'Longitude de destino é obrigatória';
    }

    setErros(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarCoordenadas()) {
      return;
    }

    // Remove marcadores anteriores
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const origemLat = parseFloat(coordenadas.origemLat);
    const origemLng = parseFloat(coordenadas.origemLng);
    const destinoLat = parseFloat(coordenadas.destinoLat);
    const destinoLng = parseFloat(coordenadas.destinoLng);

    // Adiciona marcadores
    const markerOrigem = L.marker([origemLat, origemLng])
      .addTo(mapInstanceRef.current)
      .bindPopup('Origem');
    
    const markerDestino = L.marker([destinoLat, destinoLng])
      .addTo(mapInstanceRef.current)
      .bindPopup('Destino');

    markersRef.current.push(markerOrigem, markerDestino);

    // Adiciona linha entre pontos
    const linha = L.polyline(
      [[origemLat, origemLng], [destinoLat, destinoLng]], 
      { color: '#ff3d7f', weight: 4 }
    ).addTo(mapInstanceRef.current);

    markersRef.current.push(linha);

    // Ajusta o zoom para mostrar ambos os pontos
    mapInstanceRef.current.fitBounds([
      [origemLat, origemLng],
      [destinoLat, destinoLng]
    ]);
  };

  const usarLocalizacaoAtual = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordenadas(prev => ({
          ...prev,
          origemLat: position.coords.latitude.toFixed(6),
          origemLng: position.coords.longitude.toFixed(6)
        }));
        setErros(prev => ({
          ...prev,
          origemLat: '',
          origemLng: ''
        }));
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
        alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <main className="geo-container">
      <section className="geo-content">
        <h2>Geolocalização - Calcular Rota</h2>
        
        <div className="geo-form">
          <div className="form-group">
            <h3>Origem</h3>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="origemLat">Latitude:</label>
                <input
                  id="origemLat"
                  type="number"
                  step="any"
                  value={coordenadas.origemLat}
                  onChange={(e) => setCoordenadas(prev => ({ ...prev, origemLat: e.target.value }))}
                  placeholder="-22.8747"
                  aria-describedby={erros.origemLat ? "erro-origemLat" : undefined}
                />
                {erros.origemLat && (
                  <span id="erro-origemLat" className="erro-msg">{erros.origemLat}</span>
                )}
              </div>
              
              <div className="input-field">
                <label htmlFor="origemLng">Longitude:</label>
                <input
                  id="origemLng"
                  type="number"
                  step="any"
                  value={coordenadas.origemLng}
                  onChange={(e) => setCoordenadas(prev => ({ ...prev, origemLng: e.target.value }))}
                  placeholder="-47.0655"
                  aria-describedby={erros.origemLng ? "erro-origemLng" : undefined}
                />
                {erros.origemLng && (
                  <span id="erro-origemLng" className="erro-msg">{erros.origemLng}</span>
                )}
              </div>
            </div>
            
            <button type="button" onClick={usarLocalizacaoAtual} className="btn-location">
              Usar Minha Localização Atual
            </button>
          </div>

          <div className="form-group">
            <h3>Destino</h3>
            <div className="input-row">
              <div className="input-field">
                <label htmlFor="destinoLat">Latitude:</label>
                <input
                  id="destinoLat"
                  type="number"
                  step="any"
                  value={coordenadas.destinoLat}
                  onChange={(e) => setCoordenadas(prev => ({ ...prev, destinoLat: e.target.value }))}
                  placeholder="-22.9000"
                  aria-describedby={erros.destinoLat ? "erro-destinoLat" : undefined}
                />
                {erros.destinoLat && (
                  <span id="erro-destinoLat" className="erro-msg">{erros.destinoLat}</span>
                )}
              </div>
              
              <div className="input-field">
                <label htmlFor="destinoLng">Longitude:</label>
                <input
                  id="destinoLng"
                  type="number"
                  step="any"
                  value={coordenadas.destinoLng}
                  onChange={(e) => setCoordenadas(prev => ({ ...prev, destinoLng: e.target.value }))}
                  placeholder="-47.1000"
                  aria-describedby={erros.destinoLng ? "erro-destinoLng" : undefined}
                />
                {erros.destinoLng && (
                  <span id="erro-destinoLng" className="erro-msg">{erros.destinoLng}</span>
                )}
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} className="btn-calcular">
            Calcular Rota
          </button>
        </div>

        <div ref={mapRef} className="mapa" role="application" aria-label="Mapa interativo com rota"></div>
      </section>
    </main>
  );
}