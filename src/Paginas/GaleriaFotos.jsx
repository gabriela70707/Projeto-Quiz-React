import { useState } from "react";
import { Camera } from "../Componentes/Camera";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function Galeria() {
    const [imagens, setImagens] = useState([
        
    ]);

    // Função chamada pelo Camera
    const adicionarFoto = (novaFoto) => {
        setImagens(prev => [{ img: novaFoto, title: 'Foto tirada' }, ...prev]);
    };

    return (
        <>
            <Camera onFotoTirada={adicionarFoto} />
            <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                    {imagens.map((item, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </>
    );
}
