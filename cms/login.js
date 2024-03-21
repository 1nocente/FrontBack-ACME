document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const entrarButton = document.getElementById('entrarButton');

    entrarButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Verifica se o e-mail e a senha correspondem aos valores esperados
        if (emailInput.value === 'pedrohrino13@gmail.com' && passwordInput.value === 'Nn@031551') {
            // Redireciona para outra página
            window.location.href = './dashboard.html';
        } else {
            alert('E-mail ou senha incorretos. Por favor, tente novamente.');
        }
    });
});