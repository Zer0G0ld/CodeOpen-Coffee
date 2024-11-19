document.addEventListener("DOMContentLoaded", () => {
    // Controle de navegação responsiva
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul.menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    // Validação do formulário de contato
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Impede o envio padrão do formulário
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

            if (isValid) {
                sendEmail();
            }
        });

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

        // Função para envio de e-mail
        function sendEmail() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const subject = encodeURIComponent("Novo contato do site");
            const body = encodeURIComponent(
                `Olá Matheus,\n\nVocê recebeu uma nova mensagem de contato:\n\n` +
                `Nome: ${name}\n` +
                `Email: ${email}\n` +
                `Mensagem:\n${message}\n\n` +
                `Atenciosamente,\nSeu site`
            );

            const mailtoLink = `mailto:matheus321trabalho@gmail.com?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;

            // Exibe mensagem de sucesso
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.textContent = "Mensagem enviada com sucesso!";
                successMessage.style.display = 'block';
            }
        }
    }

    // Alteração da aparência do cabeçalho ao rolar a página
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Animação de containers ao aparecerem na tela
    const containers = document.querySelectorAll('.container');
    window.addEventListener('scroll', () => {
        containers.forEach(container => {
            const rect = container.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                container.classList.add('visible');
            }
        });
    });
});
