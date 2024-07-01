document.getElementById('Calcular').addEventListener('click', calculateDebt);

function calculateDebt() {
    const totalDebt = parseFloat(document.getElementById('totalDivida').value);
    const interestRate = parseFloat(document.getElementById('taxaJuros').value) / 100;
    const monthlyPayment = parseFloat(document.getElementById('pagamentoMensal').value);

    if (isNaN(totalDebt) || isNaN(interestRate) || isNaN(monthlyPayment) || totalDebt <= 0 || interestRate <= 0 || monthlyPayment <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const outputData = calculateDebtResults(totalDebt, interestRate, monthlyPayment);

    displayResults(outputData);

    generateDebtProgressChart(outputData.balances);
    generateDebtComparisonChart(totalDebt, interestRate, monthlyPayment, outputData.totalInterest);
}

function calculateDebtResults(totalDebt, interestRate, monthlyPayment) {
    let balance = totalDebt;
    let months = 0;
    let totalInterestPaid = 0;
    const balances = [];

    while (balance > 0) {
        const interest = balance * interestRate / 12;
        totalInterestPaid += interest;
        balance += interest - monthlyPayment;
        balances.push(balance < 0 ? 0 : balance);
        months++;

        if (balance <= 0) {
            break;
        }
    }

    return {
        "estimatedTime": months,
        "totalInterest": parseFloat(totalInterestPaid.toFixed(2)),
        "balances": balances
    };
}

function displayResults(outputData) {
    document.getElementById('estimated-time').innerText = `${outputData.estimatedTime} meses`;
    document.getElementById('total-interest').innerText = `R$ ${outputData.totalInterest}`;
}

function generateDebtProgressChart(balances) {
    const ctx = document.getElementById('debt-progress-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: balances.map((_, i) => `Mês ${i + 1}`),
            datasets: [{
                label: 'Progresso da Dívida',
                data: balances,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });
}

function generateDebtComparisonChart(totalDebt, interestRate, monthlyPayment, totalInterest) {
    const ctx = document.getElementById('debt-comparison-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dívida Total', 'Taxa de Juros', 'Pagamento Mensal', 'Juros Totais Pagos'],
            datasets: [{
                label: 'Valores',
                data: [totalDebt, interestRate * 100, monthlyPayment, totalInterest],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}