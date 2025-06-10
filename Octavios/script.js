document.addEventListener('DOMContentLoaded', function() {
    const sortearBtn = document.getElementById('sortear');
    const limparHistoricoBtn = document.getElementById('limpar-historico');
    const numerosSorteadosDiv = document.getElementById('numeros-sorteados');
    const historicoNumerosDiv = document.getElementById('historico-numeros');
    
    let historico = [];
    
    sortearBtn.addEventListener('click', sortearNumeros);
    limparHistoricoBtn.addEventListener('click', limparHistorico);
    
    function sortearNumeros() {
        const min = parseInt(document.getElementById('min').value);
        const max = parseInt(document.getElementById('max').value);
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const repetir = document.getElementById('repetir').value === 'sim';
        
        // Validações
        if (min > max) {
            alert('O número mínimo não pode ser maior que o máximo!');
            return;
        }
        
        if (!repetir && (max - min + 1) < quantidade) {
            alert(`Não há números suficientes entre ${min} e ${max} para sortear ${quantidade} sem repetir!`);
            return;
        }
        
        // Limpar resultado anterior
        numerosSorteadosDiv.innerHTML = '';
        
        // Sortear números
        const numeros = [];
        const numerosDisponiveis = Array.from({length: max - min + 1}, (_, i) => min + i);
        
        for (let i = 0; i < quantidade; i++) {
            if (!repetir && numerosDisponiveis.length === 0) break;
            
            const randomIndex = Math.floor(Math.random() * numerosDisponiveis.length);
            const numeroSorteado = numerosDisponiveis[randomIndex];
            
            numeros.push(numeroSorteado);
            
            if (!repetir) {
                numerosDisponiveis.splice(randomIndex, 1);
            }
        }
        
        // Exibir números sorteados
        numeros.forEach(numero => {
            const numeroElement = document.createElement('div');
            numeroElement.className = 'numero-sorteado';
            numeroElement.textContent = numero;
            numerosSorteadosDiv.appendChild(numeroElement);
        });
        
        // Adicionar ao histórico
        historico.push({
            data: new Date().toLocaleString(),
            numeros: [...numeros],
            config: { min, max, quantidade, repetir }
        });
        
        atualizarHistorico();
    }
    
    function atualizarHistorico() {
        historicoNumerosDiv.innerHTML = '';
        
        if (historico.length === 0) {
            historicoNumerosDiv.innerHTML = '<p>Nenhum sorteio realizado ainda.</p>';
            return;
        }
        
        historico.slice().reverse().forEach((sorteio, index) => {
            const sorteioDiv = document.createElement('div');
            sorteioDiv.className = 'sorteio-historico';
            sorteioDiv.innerHTML = `
                <p><strong>Sorteio ${historico.length - index}</strong> - ${sorteio.data}</p>
                <div class="numeros-historico">
                    ${sorteio.numeros.map(num => `<span class="numero-historico">${num}</span>`).join('')}
                </div>
                <p>Config: De ${sorteio.config.min} a ${sorteio.config.max}, 
                ${sorteio.config.quantidade} número(s), 
                ${sorteio.config.repetir ? 'com' : 'sem'} repetição</p>
                <hr>
            `;
            historicoNumerosDiv.appendChild(sorteioDiv);
        });
    }
    
    function limparHistorico() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            historico = [];
            atualizarHistorico();
        }
    }
    
    // Inicializar histórico
    atualizarHistorico();
});
