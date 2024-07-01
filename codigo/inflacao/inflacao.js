window.onload = () => {
    
    const btnCalcular = document.getElementById("bntCalcular");
    const formulario = document.getElementById("formulario-calc-ipca");
    const telaResultado = document.getElementById("tela");

    btnCalcular.addEventListener('click', () => {
        if (formulario.checkValidity()) {
            inflacao();
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    });

    
        function inflacao () {

        let mesInicio = document.getElementById("mesStart").value;
        let anoInicio = parseInt(document.getElementById("anoStart").value);
        let mesFim = document.getElementById("mesEnd").value;
        let anoFim = document.getElementById("anoEnd").value;
        let valor = parseFloat(formatarValor(document.getElementById("value").value));

        
        if(mesInicio == "12"){
            anoInicio--;
        }

        anoInicio = String(anoInicio)

        let dataInicio = parseInt(anoInicio + mesInicio);
        let dataFim = parseInt(anoFim + mesFim);

        console.log(dataInicio)
        console.log(dataFim)

        if(dataInicio < 199406){
            telaResultado.innerHTML = `<p style="color: red;">Estamos usando apenas a moeda real que entrou em circulação após 07/1994, qualquer valor anterior a essa data dará erro</p>`;
        }
        else
            {
            console.log(dataInicio)
            console.log(dataFim)

            let indiceinicio;
            let indicefim;

            // CÓDIGO QUE EU ACHO QUE VAI DAR CERTO:
            fetch(`https://servicodados.ibge.gov.br/api/v1/conjunturais?d=s&user=ibge&t=1737&v=2266&p=${dataInicio}&ng=1(1)&c`)
                    .then(res => res.json())
                    .then(data => {
                        indiceinicio = data[0].v;
                        console.log('Índice de início:', indiceinicio);
                    })
                    .catch(error => {
                        console.error('Erro ao obter o índice de início:', error);
                        telaResultado.innerHTML = `<p style="color: red;">Erro ao obter o período inicial</p>`;
                    });
            
                    fetch(`https://servicodados.ibge.gov.br/api/v1/conjunturais?d=s&user=ibge&t=1737&v=2266&p=${dataFim}&ng=1(1)&c`)
                    .then(res => res.json())
                    .then(data => {
                        indicefim = data[0].v;
                        console.log('Índice de fim:', indicefim);
                        if (indiceinicio && indicefim) {
                            const ipca = calcularIPCA(indiceinicio, indicefim, valor);
                            console.log("o calculo de ipca é: " + ipca);
                            telaResultado.innerHTML = `<p>O valor corrigido pela inflação é: <strong>R$ ${ipca.toFixed(2)}</strong></p>`;
                        } else {
                            telaResultado.innerHTML = `<p style="color: red;">Erro ao obter os índices necessários para o cálculo. Tente novamente</p>`;
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao obter o índice de fim:', error);
                        telaResultado.innerHTML = `<p style="color: red;">Erro ao obter o período final</p>`;
                    });
                    
        
            console.log("o calculo de ipca é: " +calcularIPCA(indiceinicio,indicefim,valor))
        }

    }

    function calcularIPCA(i1,i2,v){
        return v*(i2/i1);
    }

    function formatarValor(valor) {
        return valor.replace(/\./g, '').replace(',', '.');
    }

}