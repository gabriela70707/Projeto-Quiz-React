import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { DSGo } from "../Paginas/DSGo";
import { Missao } from "../Paginas/Missao";
import { Galeria } from "../Paginas/GaleriaFotos";
import { Inventario } from "../Paginas/Inventario";
import { GeolocalizacaoMapa } from "../Componentes/GeolocalizacaoMapa";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      
      <Route path="/dsgo" element={<DSGo />}>
        <Route index element={<Missao />} />
        <Route path="missao" element={<Missao />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="camera" element={<Galeria />} />
        <Route path="mapa" element={<GeolocalizacaoMapa />} />
      </Route>
    </Routes>
  );
}