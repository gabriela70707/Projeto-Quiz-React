import { useState, useEffect } from "react";
import { Camera } from "../Componentes/Camera";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Componente Galeria
 * Gerencia a captura e exibição de fotos usando localStorage
 * Integra com Material UI para interface visual aprimorada
 */
export function Galeria() {
  const [fotos, setFotos] = useState([]);

  /**
   * Carrega fotos do localStorage na montagem do componente
   * Utiliza try-catch para lidar com possíveis erros de parsing
   */
  useEffect(() => {
    try {
      const salvas = localStorage.getItem("fotos");
      if (salvas) {
        setFotos(JSON.parse(salvas));
      }
    } catch (erro) {
      console.error("Erro ao carregar fotos:", erro);
      setFotos([]);
    }
  }, []);

  /**
   * Adiciona uma nova foto à galeria
   * Atualiza tanto o estado quanto o localStorage
   * @param {string} novaFoto - URL da imagem em base64
   */
  const adicionarFoto = (novaFoto) => {
    try {
      const novasFotos = [...fotos, novaFoto];
      setFotos(novasFotos);
      localStorage.setItem("fotos", JSON.stringify(novasFotos));
    } catch (erro) {
      console.error("Erro ao adicionar foto:", erro);
      alert("Não foi possível salvar a foto. Verifique o espaço disponível.");
    }
  };

  /**
   * Remove uma foto específica da galeria
   * @param {number} indice - Índice da foto a ser removida
   */
  const removerFoto = (indice) => {
    try {
      const novasFotos = fotos.filter((_, i) => i !== indice);
      setFotos(novasFotos);
      localStorage.setItem("fotos", JSON.stringify(novasFotos));
    } catch (erro) {
      console.error("Erro ao remover foto:", erro);
    }
  };

  /**
   * Limpa todas as fotos da galeria após confirmação
   */
  const limparGaleria = () => {
    const confirmacao = window.confirm("Deseja limpar sua galeria?");
    
    if (!confirmacao) return;

    try {
      localStorage.removeItem("fotos");
      setFotos([]);
    } catch (erro) {
      console.error("Erro ao limpar galeria:", erro);
    }
  };

  return (
    <main className="main">
      <Camera onFotoTirada={adicionarFoto} />
      
      {fotos.length > 0 && (
        <button 
          onClick={limparGaleria}
          aria-label="Limpar toda a galeria"
        >
          Limpar Galeria
        </button>
      )}

      {fotos.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: 800, margin: '2rem auto' }}>
          <ImageList 
            sx={{ 
              width: '100%', 
              minHeight: 450,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '1rem'
            }} 
            cols={3} 
            rowHeight={164}
            gap={12}
          >
            {fotos.map((foto, indice) => (
              <ImageListItem 
                key={indice}
                sx={{ 
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '&:hover .delete-button': {
                    opacity: 1
                  }
                }}
              >
                <img
                  src={foto}
                  alt={`Foto ${indice + 1}`}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
                <IconButton
                  className="delete-button"
                  onClick={() => removerFoto(indice)}
                  aria-label={`Remover foto ${indice + 1}`}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'rgba(255, 61, 127, 0.9)',
                    color: 'white',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 61, 127, 1)',
                    }
                  }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
    </main>
  );
}