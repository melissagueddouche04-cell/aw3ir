function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

window.onload = function () {
    console.log("DOM ready!");

    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const firstname = document.querySelector("#firstname").value.trim();
        const birthday = document.querySelector("#birthday").value;
        const address = document.querySelector("#address").value.trim();
        const email = document.querySelector("#email").value.trim();

        const birthdayDate = new Date(birthday);
        const birthdayTimestamp = birthdayDate.getTime();
        const nowTimestamp = Date.now();

        if (name.length < 5 || firstname.length < 5 || address.length < 5) {
            modalTitle.textContent = "Erreur dans le formulaire";
            modalBody.textContent = "Les champs Nom, Prénom et Adresse postale doivent contenir au moins 5 caractères.";
            myModal.show();
        } else if (!birthday || birthdayTimestamp > nowTimestamp) {
            modalTitle.textContent = "Erreur dans le formulaire";
            modalBody.textContent = "Veuillez saisir une date de naissance valide (pas dans le futur).";
            myModal.show();
        } else if (!validateEmail(email)) {
            modalTitle.textContent = "Erreur dans le formulaire";
            modalBody.textContent = "Veuillez saisir une adresse mail valide.";
            myModal.show();
        } else {
            modalTitle.textContent = `Bienvenue ${firstname} ${name}`;
            modalBody.innerHTML = `
                <p>Vous êtes né(e) le <strong>${birthday}</strong> et vous habitez 
                <a href="http://maps.google.com/maps?q=${address}" target="_blank">${address}</a>.</p>
                <p>Adresse mail : ${email}</p>
            `;
            myModal.show();
        }
    });
};