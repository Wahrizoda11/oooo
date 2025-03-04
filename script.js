const API_URL = 'https://jsonplaceholder.typicode.com/users';
        const contactList = document.getElementById("contactList");

        async function fetchContacts() {
            const response = await fetch(API_URL);
            const users = await response.json();
            contactList.innerHTML = "";
            users.forEach(user => addContactToDOM(user.name, user.phone));
        }

        function addContactToDOM(name, number) {
            const li = document.createElement("li");
            li.innerHTML = `<span>${name} - ${number}</span> <span class='delete'>❌</span>`;
            contactList.appendChild(li);
            li.querySelector(".delete").addEventListener("click", function() {
                li.remove();
            });
        }

        document.getElementById("addContact").addEventListener("click", async function() {
            const name = document.getElementById("name").value;
            const number = document.getElementById("number").value;
            if (name && number) {
                addContactToDOM(name, number); // Добавляем сразу в список
                document.getElementById("name").value = "";
                document.getElementById("number").value = "";
                
                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone: number })
                });
            }
        });

       