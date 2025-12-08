import missao from '../assets/missao_tratado.png';
import mapa from '../assets/mapa_tratado.png';
import bau from '../assets/bau_tratado.png';
import camera from '../assets/camera_tratado.png';
import { Link } from 'react-router-dom';

/**
 * Componente Menu
 * Menu de navegação fixo na parte inferior da tela
 * Fornece acesso rápido a todas as funcionalidades principais do jogo
 */
export function Menu() {
  return (
    <nav className='menu' aria-label="Menu principal de navegação">
      <ul>
        {/* Link para a página de missões */}
        <li>
          <Link to='missao' aria-label="Ir para Missões">
            <figure>
              <img src={missao} alt="" aria-hidden="true" />
              <figcaption>Missões</figcaption>
            </figure>
          </Link>
        </li>
        
        {/* Link para a página de inventário */}
        <li>
          <Link to='inventario' aria-label="Ir para Inventário">
            <figure>
              <img src={bau} alt="" aria-hidden="true" />
              <figcaption>Inventário</figcaption>
            </figure>
          </Link>
        </li>
        
        {/* Link para a página de geolocalização */}
        <li>
          <Link to='mapa' aria-label="Ir para Geolocalização">
            <figure>
              <img src={mapa} alt="" aria-hidden="true" />
              <figcaption>Mapa</figcaption>
            </figure>
          </Link>
        </li>
        
        {/* Link para a página de câmera */}
        <li>
          <Link to='camera' aria-label="Ir para Câmera">
            <figure>
              <img src={camera} alt="" aria-hidden="true" />
              <figcaption>Câmera</figcaption>
            </figure>
          </Link>
        </li>
      </ul>
    </nav>
  );
}