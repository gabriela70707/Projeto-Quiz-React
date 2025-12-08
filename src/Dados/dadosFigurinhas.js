export const figurinhasDisponiveis = [
  {
    id: 1,
    nome: "Mestre Frontend",
    imagem: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23ff3d7f' width='100' height='100' rx='10'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='white'%3E⚛️%3C/text%3E%3C/svg%3E",
    descricao: "Conquistada ao completar 3 missões de Frontend"
  },
  {
    id: 2,
    nome: "Expert Backend",
    imagem: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%232cd0e5' width='100' height='100' rx='10'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='white'%3E🔧%3C/text%3E%3C/svg%3E",
    descricao: "Conquistada ao completar 3 missões de Backend"
  },
  {
    id: 3,
    nome: "Guardião de Dados",
    imagem: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23b9820b' width='100' height='100' rx='10'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='white'%3E🗄️%3C/text%3E%3C/svg%3E",
    descricao: "Conquistada ao completar 3 missões de Banco de Dados"
  },
  {
    id: 4,
    nome: "Testador Elite",
    imagem: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%234c0f32' width='100' height='100' rx='10'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='white'%3E✓%3C/text%3E%3C/svg%3E",
    descricao: "Conquistada ao completar 3 missões de Testes"
  },
  {
    id: 5,
    nome: "Conhecedor DS",
    imagem: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23e4018d' width='100' height='100' rx='10'/%3E%3Ctext x='50' y='55' font-size='40' text-anchor='middle' fill='white'%3E🎓%3C/text%3E%3C/svg%3E",
    descricao: "Conquistada ao completar 5 missões sobre professores"
  }
];

/**
 * Função auxiliar para adicionar figurinha ao inventário
 * @param {number} figurinhaId - ID da figurinha a ser adicionada
 */
export function adicionarFigurinhaAoInventario(figurinhaId) {
  try {
    const inventarioAtual = JSON.parse(localStorage.getItem("inventario") || "[]");
    
    // Verifica se já possui esta figurinha
    const jaExiste = inventarioAtual.some(f => f.id === figurinhaId);
    if (jaExiste) {
      console.log("Figurinha já está no inventário");
      return false;
    }

    // Encontra a figurinha nos dados disponíveis
    const figurinha = figurinhasDisponiveis.find(f => f.id === figurinhaId);
    if (!figurinha) {
      console.error("Figurinha não encontrada");
      return false;
    }

    // Adiciona ao inventário
    inventarioAtual.push(figurinha);
    localStorage.setItem("inventario", JSON.stringify(inventarioAtual));
    
    console.log(`Figurinha "${figurinha.nome}" adicionada ao inventário!`);
    return true;
  } catch (erro) {
    console.error("Erro ao adicionar figurinha:", erro);
    return false;
  }
}

/**
 * Verifica quantas missões de um tipo foram completadas
 * @param {string} tipo - Tipo de missão (Frontend, Backend, etc)
 * @returns {number} Quantidade de missões completadas deste tipo
 */
export function verificarProgressoPorTipo(tipo) {
  try {
    const missoesConcluidas = JSON.parse(localStorage.getItem("missoesConcluidas") || "[]");
    // Aqui você pode implementar a lógica para contar por tipo
    return missoesConcluidas.filter(m => m.includes(tipo)).length;
  } catch (erro) {
    console.error("Erro ao verificar progresso:", erro);
    return 0;
  }
}