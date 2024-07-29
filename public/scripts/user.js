const userPath = '/api/user';

async function fetchData() {
    try {
        const response = await fetch(userPath);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        const userName = `${data.first_name} ${data.last_name}`;
        const userEmail = data.email;

        document.getElementById('user-name').textContent = `Name: ${userName}`;
        document.getElementById('user-email').textContent = `Name: ${userEmail}`;
    } catch (error) {
        console.error('Problem with fetch call: ', error);
    }
}

// fetchData();