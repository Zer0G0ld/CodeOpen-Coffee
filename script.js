document.addEventListener("DOMContentLoaded", () => {
    // Controle de navegação responsiva
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul.menu");

    menuToggle?.addEventListener("click", () => {
        navMenu?.classList.toggle("show");
    });

    // Validação do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    const errorMessages = {
        name: "Por favor, insira seu nome.",
        email: "Por favor, insira um email válido.",
        message: "Por favor, insira sua mensagem."
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let isValid = true;

            const fields = [
                { id: 'name', errorId: 'nameError', validate: value => value.trim() !== '' },
                { id: 'email', errorId: 'emailError', validate: value => document.getElementById('email').checkValidity() },
                { id: 'message', errorId: 'messageError', validate: value => value.trim() !== '' }
            ];

            // Limpa mensagens de erro
            clearErrors();

            // Valida os campos
            fields.forEach(field => {
                const inputElement = document.getElementById(field.id);
                if (inputElement && !field.validate(inputElement.value)) {
                    showError(field.errorId);
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault(); // Impede o envio se houver erros
            }
        });
    }

    // Função para limpar todas as mensagens de erro
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
    }

    // Função para exibir uma mensagem de erro específica
    function showError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = 'block';
        }
    }
});


document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Formatação melhorada do corpo do e-mail
    const subject = encodeURIComponent("Novo contato do site");
    const body = encodeURIComponent(
        `Olá Matheus,\n\nVocê recebeu uma nova mensagem de contato:\n\n` +
        `Nome: ${name}\n` +
        `Email: ${email}\n` +
        `Mensagem:\n${message}\n\n` +
        `Atenciosamente,\nSeu site`
    );

    // Construção do link mailto com formatação
    const mailtoLink = `mailto:matheus321trabalho@gmail.com?subject=${subject}&body=${body}`;
    
    // Redireciona para o link mailto
    window.location.href = mailtoLink;
});
    