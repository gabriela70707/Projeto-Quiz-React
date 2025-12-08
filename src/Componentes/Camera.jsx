import { useState, useEffect, useRef } from "react";

/**
 * Componente Camera
 * Gerencia captura de fotos usando a API MediaDevices
 * Permite tirar fotos e reiniciar o processo
 * 
 * @param {Function} onFotoTirada - Callback executado quando uma foto é capturada
 */
export function Camera({ onFotoTirada }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [erro, setErro] = useState(null);

  /**
   * Inicializa a câmera ao montar o componente
   * Limpa os recursos ao desmontar
   */
  useEffect(() => {
    iniciarCamera();
    return () => pararCamera();
  }, []);

  /**
   * Solicita acesso à câmera do dispositivo
   * Configura o stream de vídeo no elemento video
   */
  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setErro(null);
    } catch (error) {
      console.error("Falha de comunicação com a câmera:", error);
      setErro("Não foi possível acessar a câmera. Verifique as permissões.");
    }
  };

  /**
   * Para todos os tracks de vídeo ativos
   * Libera recursos da câmera
   */
  const pararCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  /**
   * Captura o frame atual do vídeo
   * Converte para imagem base64
   * Chama o callback com a imagem capturada
   */
  const tirarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) {
      console.error("Referências de vídeo ou canvas não encontradas");
      return;
    }

    const ctx = canvas.getContext("2d");
    
    // Define dimensões do canvas baseadas no vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenha o frame atual no canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Converte canvas para imagem base64
    const imagem = canvas.toDataURL("image/png");
    setFoto(imagem);

    // Executa callback se fornecido
    if (onFotoTirada) {
      onFotoTirada(imagem);
    }

    // Para a câmera após captura
    pararCamera();
  };

  /**
   * Reinicia o processo de captura
   * Limpa a foto atual e reinicia a câmera
   */
  const reiniciar = () => {
    setFoto(null);
    iniciarCamera();
  };

  return (
    <section className="camera-box">
      <h2>Captura da Câmera</h2>
      
      {erro && (
        <div className="erro-camera" role="alert">
          <p>{erro}</p>
        </div>
      )}
      
      <div className="preview">
        {!foto ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            aria-label="Fluxo da câmera"
          />
        ) : (
          <img 
            src={foto} 
            alt="Foto capturada pela câmera" 
          />
        )}
      </div>
      
      <div className="camera-controles">
        {!foto ? (
          <button 
            onClick={tirarFoto}
            aria-label="Tirar foto"
          >
            Tirar Foto
          </button>
        ) : (
          <button 
            onClick={reiniciar}
            aria-label="Tirar nova foto"
          >
            Nova Foto
          </button>
        )}
      </div>
      
      {/* Canvas oculto usado para captura */}
      <canvas 
        ref={canvasRef} 
        style={{ display: "none" }}
        aria-hidden="true"
      />
    </section>
  );
}