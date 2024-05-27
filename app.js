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

            displayScores(data);
        } catch (error) {
            console.error('Error fetching the cricket scores:', error);
            scoreboard.innerHTML = '<p>Failed to load scores. Please try again later.</p>';
        }
    }

    function displayScores(data) {
        if (data.matches && data.matches.length > 0) {
            scoreboard.innerHTML = data.matches.map(match => `
                <div class="match">
                    <p><strong>${match.team1} vs ${match.team2}</strong></p>
                    <p>Score: ${match.score}</p>
                    <p>Status: ${match.status}</p>
                </div>
            `).join('');
        } else {
            scoreboard.innerHTML = '<p>No live matches currently.</p>';
        }
    }

    // Refresh scores every 30 seconds
    fetchScores();
    setInterval(fetchScores, 30000);
});
