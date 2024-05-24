    
    // Código do Chatbot
    window.watsonAssistantChatOptions = {
    integrationID: "26e70437-eaa1-448e-bcf9-ba11660abc82",
    region: "au-syd",
    serviceInstanceID: "4224444c-a45c-4c8b-83a2-633cd08f9bfd",
    onLoad: async (instance) => { await instance.render(); }
    };
    setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);});

    // FAQ - Ocultar/mostrar dúvidas 
    function alternarTexto1() {
        var texto = document.getElementById("ocultarTexto1");
        if (texto.style.display === "none") {
            texto.style.display = "block";
        } else {
            texto.style.display = "none";
        }
    }

    function alternarTexto2() {
        var texto = document.getElementById("ocultarTexto2");
        if (texto.style.display === "none") {
            texto.style.display = "block";
        } else {
            texto.style.display = "none";
        }
    }

    // IDENTIFICAÇÃO CADASTRO E SALVAR
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
        return true;
    }
    
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj.length !== 14) return false;
    
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0))) return false;
    
        tamanho += 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1))) return false;
    
        return true;
    }
    
    function identificarEGuardarCPFouCNPJ(input) {
        const cpfOuCnpj = input.replace(/[^\d]+/g, '');
    
        if (cpfOuCnpj.length === 11 && validarCPF(cpfOuCnpj)) {
            console.log('CPF válido:', cpfOuCnpj);
            // Salvar CPF
        } else if (cpfOuCnpj.length === 14 && validarCNPJ(cpfOuCnpj)) {
            console.log('CNPJ válido:', cpfOuCnpj);
            // Salvar CNPJ
        } else {
            console.log('Número inválido');
        }
    }
    // Exemplo de uso:
    const input = '123.456.789-09'; 
    identificarEGuardarCPFouCNPJ(input);

    // DÚVIDAS - PERGUNTAS E RESPOSTAS
    document.addEventListener('DOMContentLoaded', () => {
        loadQuestions();
    });
    
    function addQuestion() {
        const questionInput = document.getElementById('questionInput');
        const questionText = questionInput.value.trim();
        if (questionText === '') {
            alert('Por favor, faça uma pergunta.');
            return;
        }
    
        const question = {
            id: Date.now(),
            text: questionText,
            answer: ''
        };
    
    saveQuestion(question);
        questionInput.value = '';
        renderQuestions();
    }
    
    function saveQuestion(question) {
        let questions = getQuestions();
        questions.push(question);
        localStorage.setItem('questions', JSON.stringify(questions));
    }
    
    function getQuestions() {
        const questions = localStorage.getItem('questions');
        return questions ? JSON.parse(questions) : [];
    }
    
    function loadQuestions() {
        renderQuestions();
    }
    
    function renderQuestions() {
        const containerDuvidas = document.getElementById('containerDuvidas');
        questionsContainer.innerHTML = '';
        const questions = getQuestions();
    
        questions.forEach(question => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
    
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = question.text;
            questionDiv.appendChild(questionTitle);
    
            const answerTextarea = document.createElement('textarea');
            answerTextarea.placeholder = 'Responda aqui...';
            answerTextarea.value = question.answer;
            answerTextarea.addEventListener('input', (event) => {
                updateAnswer(question.id, event.target.value);
            });
            questionDiv.appendChild(answerTextarea);
    
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Salvar Resposta';
            saveButton.addEventListener('click', () => {
                updateAnswer(question.id, answerTextarea.value);
            });
            questionDiv.appendChild(saveButton);
    
            questionsContainer.appendChild(questionDiv);
        });
    }
    
    function updateAnswer(questionId, answer) {
        let questions = getQuestions();
        questions = questions.map(question => {
            if (question.id === questionId) {
                return {
                    ...question,
                    answer: answer
                };
            }
            return question;
        });
        localStorage.setItem('questions', JSON.stringify(questions));
        renderQuestions();
    }


    // PAGAMENTO PLANOS
    function selectPlan(plan) {
        const planNames = {
            silver: 'Silver',
            gold: 'Gold',
            diamond: 'Diamond'
        };
    
        document.getElementById('selected-plan').textContent = planNames[plan];
        document.getElementById('payment-section').classList.remove('hidden');
    }
    // Validação simples do formulário de pagamento
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
    
        if (cardNumber && expiryDate && cvv) {
            alert('Pagamento realizado com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
    