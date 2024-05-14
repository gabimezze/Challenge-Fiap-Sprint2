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

    // Ocultar/mostrar dúvidas
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