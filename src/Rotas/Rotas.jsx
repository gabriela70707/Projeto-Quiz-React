import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { DSGo } from "../Paginas/DSGo";
import { Missao } from "../Paginas/Missao";
import { Galeria } from "../Paginas/GaleriaFotos";
import { Inventario } from "../Paginas/Inventario";
import { GeolocalizacaoMapa } from "../Componentes/GeolocalizacaoMapa";

/**
 * Componente de Rotas
 * Define todas as rotas da aplicação usando React Router
 * Organiza a navegação hierárquica com rotas aninhadas
 */
export function Rotas() {
  return (
    <Routes>
      {/* Rota inicial - tela de entrada */}
      <Route path="/" element={<Inicial />} />
      
      {/* Rotas principais do jogo - layout com menu inferior */}
      <Route path="/dsgo" element={<DSGo />}>
        {/* Rota index - página inicial dentro do jogo */}
        <Route index element={<DSGo />} />
        
        {/* Página de missões */}
        <Route path="missao" element={<Missao />} />
        
        {/* Página de inventário */}
        <Route path="inventario" element={<Inventario />} />
        
        {/* Página de câmera e galeria de fotos */}
        <Route path="camera" element={<Galeria />} />
        
        {/* Página de geolocalização com mapas */}
        <Route path="mapa" element={<GeolocalizacaoMapa />} />
      </Route>
    </Routes>
  );
}