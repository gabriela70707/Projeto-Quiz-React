import { useState, useEffect, useRef } from "react";

export function Camera({ onFotoTirada }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [foto, setFoto] = useState(null);

    useEffect(() => {
        iniciarCamera();
        return () => pararCamera(); // encerra stream ao desmontar
    }, []);

    const iniciarCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Falha de comunicação com a câmera", error);
        }
    };

    const pararCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const tirarFoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imagem = canvas.toDataURL("image/png");
        setFoto(imagem);

        if (onFotoTirada) {
            onFotoTirada(imagem);
        }
    };

    const reiniciar = () => {
        setFoto(null);
        iniciarCamera();
    };

    return (
        <section className="camera-box">
            <h2>Captura da câmera</h2>
            <div className="preview">
                {!foto ? (
                    <video ref={videoRef} autoPlay playsInline aria-label="Fluxo da câmera" />
                ) : (
                    <img src={foto} alt="Foto capturada" />
                )}
            </div>
            <div>
                {!foto ? (
                    <button onClick={tirarFoto}>Tirar foto</button>
                ) : (
                    <button onClick={reiniciar}>Nova foto</button>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </section>
    );
}
