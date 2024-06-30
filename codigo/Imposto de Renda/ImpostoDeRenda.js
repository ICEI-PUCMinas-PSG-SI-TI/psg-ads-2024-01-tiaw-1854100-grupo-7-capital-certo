function calcularImposto() {
  const rendaBruta = parseFloat(document.getElementById('rendaBruta').value);
  const descontos = parseFloat(document.getElementById('descontos').value);
  const dependentes = parseFloat(document.getElementById('dependentes').value);
  const outrasDeducoes = parseFloat(document.getElementById('outrasDeducoes').value);
  const impostoRetido = parseFloat(document.getElementById('impostoRetido').value);
  const outrosRendimentos = parseFloat(document.getElementById('outrosRendimentos').value);

  if (isNaN(rendaBruta) || isNaN(descontos) || isNaN(dependentes) || isNaN(outrasDeducoes) || isNaN(impostoRetido) || isNaN(outrosRendimentos)) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const dadosImposto = {
    renda_bruta: rendaBruta,
    descontos: descontos,
    dependentes: dependentes,
    outras_deducoes: outrasDeducoes,
    imposto_retido: impostoRetido,
    outros_rendimentos: outrosRendimentos
  };

  localStorage.setItem('dadosImposto', JSON.stringify(dadosImposto));

  const dadosArmazenados = JSON.parse(localStorage.getItem('dadosImposto'));

  let baseCalculo = dadosArmazenados.renda_bruta - dadosArmazenados.descontos - (dadosArmazenados.dependentes * 189.59) - dadosArmazenados.outras_deducoes;

  if (baseCalculo < 0) {
    baseCalculo = 0;
  }

  // Calcula o imposto bruto de acordo com a tabela progressiva
  let impostoBruto = 0;
  if (baseCalculo <= 22847.76) {
      impostoBruto = 0;
  } else if (baseCalculo <= 33919.80) {
      impostoBruto = baseCalculo * 0.075 - 1713.58;
  } else if (baseCalculo <= 45012.60) {
      impostoBruto = baseCalculo * 0.15 - 4257.57;
  } else if (baseCalculo <= 55976.16) {
      impostoBruto = baseCalculo * 0.225 - 7633.51;
  } else {
      impostoBruto = baseCalculo * 0.275 - 10432.32;
  }

  // Calcula o imposto devido
  let impostoDevido = impostoBruto - dadosArmazenados.imposto_retido;

  // Se o imposto devido for negativo, ajusta para 0
  impostoDevido = Math.max(impostoDevido, 0);

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
  <div class="resultadoImposto">
  <h2 class="title-section text-center">Resultado</h2>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-6"><p><strong>Base de Cálculo:</strong> R$ ${baseCalculo.toFixed(2)}</p></div>
      <div class="col-sm-12 col-md-6"><p><strong>Imposto Bruto:</strong> R$ ${impostoBruto.toFixed(2)}</p></div>
      <div class="col-sm-12 col-md-6"><p><strong>Imposto Retido na Fonte:</strong> R$ ${dadosArmazenados.imposto_retido.toFixed(2)}</p></div>
      <div class="col-sm-12 col-md-6"><p><strong>Imposto Devido:</strong> R$ ${impostoDevido.toFixed(2)}</p></div>
    </div>
  </div>
</div>
  `;
}