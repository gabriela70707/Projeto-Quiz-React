import { useState, useEffect } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';
import { adicionarFigurinhaAoInventario } from '../Dados/dadosFigurinhas';

/**
 * Componente Missão
 * Gerencia a exibição e conclusão de missões
 * Integra com sistema de inventário para recompensas
 * Persiste progresso em localStorage
 */
export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState([]);

  /**
   * Carrega missões concluídas do localStorage na montagem
   */
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

  /**
   * Salva missões concluídas no localStorage sempre que mudam
   */
  useEffect(() => {
    if (missoesConcluidas.length > 0) {
      try {
        localStorage.setItem("missoesConcluidas", JSON.stringify(missoesConcluidas));
      } catch (erro) {
        console.error("Erro ao salvar missões concluídas:", erro);
      }
    }
  }, [missoesConcluidas]);

  /**
   * Marca missão como concluída e verifica recompensas
   * @param {number} id - ID da missão concluída
   */
  const concluirMissao = (id) => {
    // Adiciona missão às concluídas
    setMissoesConcluidas((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });

    // Fecha modal
    setMissaoSelecionada(null);

    // Verifica se ganhou figurinha
    verificarRecompensas(id);
  };

  /**
   * Verifica se o jogador ganhou alguma figurinha
   * Baseado na quantidade de missões concluídas por tipo
   * @param {number} missaoId - ID da última missão concluída
   */
  const verificarRecompensas = (missaoId) => {
    const missao = missoes.find(m => m.id === missaoId);
    if (!missao) return;

    const totalConcluidas = missoesConcluidas.length + 1;

    // Recompensas baseadas em quantidade total de missões
    if (totalConcluidas === 5) {
      adicionarFigurinhaAoInventario(1); // Mestre Frontend
    } else if (totalConcluidas === 10) {
      adicionarFigurinhaAoInventario(2); // Expert Backend
    } else if (totalConcluidas === 15) {
      adicionarFigurinhaAoInventario(3); // Guardião de Dados
    } else if (totalConcluidas === 20) {
      adicionarFigurinhaAoInventario(4); // Testador Elite
      adicionarFigurinhaAoInventario(5); // Conhecedor DS
    }
  };

  return (
    <section className='conteiner'>
      <h2>Missões</h2>
      
      {/* Contador de progresso */}
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

      {/* Grid de missões */}
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

      {/* Modal de missão ativa */}
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