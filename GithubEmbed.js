class GithubEmbed {
  constructor(org, repo) {
    this.org = org;
    this.repo = repo;
    this.baseUrl = 'https://api.github.com';
  }

  async fetchData() {
    const [repoData, contributorsData] = await Promise.all([
      this.getRepo(),
      this.getContributors()
    ]);
    return { repoData, contributorsData };
  }

  async getRepo() {
    const response = await fetch(`${this.baseUrl}/repos/${this.org}/${this.repo}`);
    if (!response.ok) {
      throw new Error(`Error fetching repo: ${response.statusText}`);
    }
    return await response.json();
  }

  async getContributors() {
    const response = await fetch(`${this.baseUrl}/repos/${this.org}/${this.repo}/contributors?per_page=8`);
    if (!response.ok) {
      throw new Error(`Error fetching contributors: ${response.statusText}`);
    }
    return await response.json();
  }

  render() {
    const container = document.createElement('div');
    container.className = 'repo-card';
    container.innerHTML = `
          <a href="#" target="_blank" style="text-decoration: none;">
              <img class="repo-image loader">
              <h1 class="repo-title loader-text loader"></h1>
              <div class="repo-stats">
                  <div class="repo-stat">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                          <path fill="currentColor" d="M243 96a20.33 20.33 0 0 0-17.74-14l-56.59-4.57l-21.84-52.81a20.36 20.36 0 0 0-37.66 0L87.35 77.44L30.76 82a20.45 20.45 0 0 0-11.66 35.88l43.18 37.24l-13.2 55.7A20.37 20.37 0 0 0 79.57 233L128 203.19L176.43 233a20.39 20.39 0 0 0 30.49-22.15l-13.2-55.7l43.18-37.24A20.43 20.43 0 0 0 243 96m-70.47 45.7a12 12 0 0 0-3.84 11.86L181.58 208l-47.29-29.08a12 12 0 0 0-12.58 0L74.42 208l12.89-54.4a12 12 0 0 0-3.84-11.86l-42.27-36.5l55.4-4.47a12 12 0 0 0 10.13-7.38L128 41.89l21.27 51.5a12 12 0 0 0 10.13 7.38l55.4 4.47Z"/>
                      </svg>
                      <span class="stargazers_count loader-text loader"></span> <span>Stars</span>
                  </div>
                  <div class="repo-stat">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4m1-5.874A4.002 4.002 0 0 1 12 23a4 4 0 0 1-1-7.874V13H7a3 3 0 0 1-3-3V8.874A4.002 4.002 0 0 1 5 1a4 4 0 0 1 1 7.874V10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8.874A4.002 4.002 0 0 1 19 1a4 4 0 0 1 1 7.874V10a3 3 0 0 1-3 3h-4zM4.997 7h.006a2 2 0 1 0-.006 0M19 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4"/>
                      </svg>
                      <span class="forks_count loader-text loader"></span> <span>Forks</span>
                  </div>
                  <div class="repo-stat">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                          <path fill="currentColor" d="M1.5 8a6.5 6.5 0 0 1 13 0A.75.75 0 0 0 16 8a8 8 0 1 0-8 8a.75.75 0 0 0 0-1.5A6.5 6.5 0 0 1 1.5 8"/>
                          <path fill="currentColor" d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m1.5 1.75a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m2.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"/>
                      </svg>
                      <span class="open_issues_count loader-text loader"></span> <span>Issues</span>
                  </div>
              </div>
          </a>
          <div class="contributors">
              <div class="contributors-container"></div>
          </div>
      `;
    document.body.appendChild(container);

    this.fetchData()
      .then(({ repoData, contributorsData }) => {
        const image = container.querySelector('.repo-image');
        const title = container.querySelector('.repo-title');

        image.src = repoData.owner.avatar_url;
        image.alt = `${repoData.full_name} logo`;
        title.textContent = repoData.full_name;

        container.querySelector('.stargazers_count').textContent = repoData.stargazers_count;
        container.querySelector('.forks_count').textContent = repoData.forks_count;
        container.querySelector('.open_issues_count').textContent = repoData.open_issues_count;

        const link = container.querySelector('a');
        link.href = repoData.html_url;

        if (contributorsData.length > 1) {
          this.renderContributors(contributorsData.slice(0, 5), container);
        } else {
          container.querySelector('.contributors').style.display = 'none';
        }

        container.querySelectorAll('.loader').forEach(el => el.classList.remove('loader'));
        container.querySelectorAll('.loader-text').forEach(el => el.classList.remove('loader-text'));
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        const errorMessage = document.createElement('div');
        errorMessage.innerHTML = `<p>Error loading data: ${error.message}</p>`;
        container.innerHTML = ''; // Clear loading content
        container.appendChild(errorMessage); // Show error message
      });
  }

  renderContributors(contributorsData, container) {
    const contributorsContainer = container.querySelector('.contributors-container');
    contributorsData.forEach((contributor, index) => {
      const contributorItem = document.createElement('div');
      contributorItem.innerHTML = `
              <img src="${contributor.avatar_url}" alt="${contributor.login} avatar" class="contributor-avatar" style="left: ${index * 16}px; z-index: ${5 - index}; opacity: ${(5 - index) * 0.2};">
          `;
      contributorsContainer.appendChild(contributorItem);
    });
  }
}
