import { useState, useEffect } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';
import { adicionarFigurinhaAoInventario } from '../Dados/dadosFigurinhas';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  useEffect(() => {
    try {
      const salvas = localStorage.getItem("missoesConcluidas");
      if (salvas) {
        setMissoesConcluidas(JSON.parse(salvas));
      }
    } catch (erro) {
      console.error("Erro ao carregar missões concluídas:", erro);
    }
  }, []);

  useEffect(() => {
    if (missoesConcluidas.length > 0) {
      try {
        localStorage.setItem("missoesConcluidas", JSON.stringify(missoesConcluidas));
      } catch (erro) {
        console.error("Erro ao salvar missões concluídas:", erro);
      }
    }
  }, [missoesConcluidas]);

  const concluirMissao = (id) => {
    setMissoesConcluidas((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });

    setMissaoSelecionada(null);
    verificarRecompensas(id);
  };

  const verificarRecompensas = (missaoId) => {
    const totalConcluidas = missoesConcluidas.length + 1;

    if (totalConcluidas === 5) {
      adicionarFigurinhaAoInventario(1);
    } else if (totalConcluidas === 10) {
      adicionarFigurinhaAoInventario(2);
    } else if (totalConcluidas === 15) {
      adicionarFigurinhaAoInventario(3);
    } else if (totalConcluidas === 20) {
      adicionarFigurinhaAoInventario(4);
      adicionarFigurinhaAoInventario(5);
    }
  };

  const limparMissoes = () => {
    if (!window.confirm("Deseja realmente limpar todas as missões concluídas?")) return;
    localStorage.removeItem("missoesConcluidas");
    setMissoesConcluidas([]);
  };

  return (
    <section className='conteiner'>
      <h2>Missões</h2>
      
      <div className="progresso-missoes">
        <p>
          Missões Concluídas: {missoesConcluidas.length} / {missoes.length}
        </p>
        <progress 
          value={missoesConcluidas.length} 
          max={missoes.length}
          aria-label={`Progresso das missões: ${missoesConcluidas.length} de ${missoes.length} concluídas`}
        />
      </div>

      <button className="limpar-missoes" onClick={limparMissoes}>
        Limpar Progresso
      </button>

      <div className="missoes-grid">
        {missoes.map((m) => (
          <MissaoCard
            key={m.id} 
            missao={m}  
            onIniciarMissao={setMissaoSelecionada} 
            concluida={missoesConcluidas.includes(m.id)} 
          />
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal 
          missao={missaoSelecionada} 
          onClose={() => setMissaoSelecionada(null)} 
          onConcluir={() => concluirMissao(missaoSelecionada.id)} 
        />
      )}
    </section>
  );
}