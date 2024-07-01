window.onload = () => {
    const btnCalcular = document.getElementById("bntCalcular");
    const formulario = document.getElementById("formularioTitulo");
    const telaResultado = document.getElementById("tela");

    btnCalcular.addEventListener('click', (event) => {
        event.preventDefault(); 
        if (formulario.checkValidity()) {
            calculoDeTitulo();
        } else {
            alert("Por favor, preencha corretamente todos os campos obrigatórios.");
        }
    });

    function calculoDeTitulo() {
        let rendimento = parseFloat(formatarValor(document.getElementById("rendimento").value));
        let montante = parseFloat(formatarValor(document.getElementById("montante").value));
        let anoRetirada = parseInt(document.getElementById("anoRetirada").value) - 1;
        let mesRetirada = parseInt(document.getElementById("mesRetirada").value) - 1;
        let mesinicio = parseInt(document.getElementById("mesinicio").value) - 1;
        let anoinicio = parseInt(document.getElementById("anoinicio").value);
        let valor = montante;

        let mesPorRendimento = 1 + (rendimento / 1200);

        if (anoRetirada < anoinicio) {
            telaResultado.innerHTML = `<p>Erro ano de retirada é menor que o ano do investimento</p>`;
        } else {
            let Periodo = ((anoRetirada - anoinicio) * 12) + (12 - mesinicio) +  mesRetirada;

            for (let i = 0; i < Periodo; i++) {
                valor *= mesPorRendimento;
            }

            telaResultado.innerHTML = `<p>Valor bruto do resgate é de: <strong>R$ ${valor.toFixed(2)}</strong></p>`;
        }
    }

    function formatarValor(valor) {
        return valor.replace(/\./g, '').replace(',', '.');
    }
};