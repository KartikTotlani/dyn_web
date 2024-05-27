document.addEventListener('DOMContentLoaded', () => {
    const scoreboard = document.getElementById('scoreboard');

    async function fetchScores() {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", "aMFouLkMjcxGopFBPmzjWGMKQCkVKPDMsghukTvPHaPWzsqALZZFfGRtpBgvEKVVLGDJjDBavveHcoVKhuqjovsRWhkgGEQiyRmX");
        myHeaders.append("x-app-version", "1.0.0");
        myHeaders.append("x-apihub-key", "");
        myHeaders.append("x-apihub-host", "International-Football-Results-API.allthingsdev.co");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://International-Football-Results-API.proxy-production.allthingsdev.co/api/v1/cricket/matches?year=2023&skip=0&limit=10", requestOptions);
            const data = await response.json();

            // Log the response data for debugging
            console.log(data);

            displayScores(data);
        } catch (error) {
            console.error('Error fetching the cricket scores:', error);
            scoreboard.innerHTML = '<p>Failed to load scores. Please try again later.</p>';
        }
    }

    function displayScores(data) {
        if (data && data.matches && data.matches.length > 0) {
            scoreboard.innerHTML = data.matches.map(match => `
                <div class="match">
                    <p><strong>${match.team1} vs ${match.team2}</strong></p>
                    <p>Score: ${match.score || 'N/A'}</p>
                    <p>Status: ${match.status || 'N/A'}</p>
                </div>
            `).join('');
        } else {
            scoreboard.innerHTML = '<p>No live matches currently.</p>';
        }
    }

    // Fetch scores when the page loads and every 30 seconds thereafter
    fetchScores();
    setInterval(fetchScores, 30000);
});
