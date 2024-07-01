function calcularResultados() {
    const valorCompra = parseFloat(document.getElementById('valorCompra').value);
    const valorAluguel = parseFloat(document.getElementById('valorAluguel').value);
    const valorizacaoAnual = parseFloat(document.getElementById('valorizacaoAnual').value) / 100;
    const valorIGPM = parseFloat(document.getElementById('valorIGPM').value) / 100;
    const entrada = parseFloat(document.getElementById('entrada').value);
    const outrosCustos = parseFloat(document.getElementById('outrosCustos').value);
    const prazoFinanciamento = parseInt(document.getElementById('prazoFinanciamento').value); 
    const cet = parseFloat(document.getElementById('cet').value) / 100;
    
    

    if (isNaN(valorCompra) || isNaN(valorAluguel) || isNaN(valorizacaoAnual) || isNaN(valorIGPM) || isNaN(entrada) || isNaN(outrosCustos) || isNaN(prazoFinanciamento) || isNaN(cet) ) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const valorFinanciado = valorCompra - entrada + outrosCustos;
    const jurosMensal = cet / 12;

    const mensalidade = valorFinanciado * jurosMensal / (1 - Math.pow(1 + jurosMensal, -prazoFinanciamento));
    const totalPagoFinanciamento = mensalidade * prazoFinanciamento;

    const patrimonioTotalFinanciando = valorCompra * Math.pow(1 + valorizacaoAnual, prazoFinanciamento / 12);
    const totalAportadoFinanciando = entrada;

    let valorTotalAluguel = 0;
    let aluguelAtual = valorAluguel;
    for (let i = 0; i < prazoFinanciamento; i++) {
        valorTotalAluguel += aluguelAtual;
        if ((i + 1) % 12 === 0) {
            aluguelAtual *= 1 + valorIGPM;
        }
    }

    let totalAportadoAlugInvestindo = entrada;
    let saldoInvestimento = 0;

    for (let i = 0; i < prazoFinanciamento; i++) {
        saldoInvestimento += (mensalidade - valorAluguel) * Math.pow(1 + valorizacaoAnual / 12, prazoFinanciamento - i);
    }
    totalAportadoAlugInvestindo += saldoInvestimento;
    const patrimonioTotalAlugInvestindo = totalAportadoAlugInvestindo * Math.pow(1 + valorizacaoAnual, prazoFinanciamento / 12);

    document.getElementById('patrimonioTotalFinanciando').value = patrimonioTotalFinanciando.toFixed(2);
    document.getElementById('totalPagoFinanciando').value = totalPagoFinanciamento.toFixed(2);
    document.getElementById('totalAportadoFinanciando').value = totalAportadoFinanciando.toFixed(2);

    document.getElementById('patrimonioTotalAlugInvestindo').value = patrimonioTotalAlugInvestindo.toFixed(2);
    document.getElementById('totalPagoAluguel').value = valorTotalAluguel.toFixed(2);
    document.getElementById('totalAportadoAlugInvestindo').value = totalAportadoAlugInvestindo.toFixed(2);
}
