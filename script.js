window.addEventListener('DOMContentLoaded', async () => {
  // Profile image fetch (already present)
  const username = 'Focus098xdd';
  const profilePicDiv = document.getElementById('profile-pic');
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    if (data.avatar_url) {
      profilePicDiv.innerHTML = `<img src="${data.avatar_url}" alt="GitHub Profile" />`;
    }
  } catch (e) {
    // If fetch fails, keep the placeholder
    console.error('Failed to fetch GitHub profile image:', e);
  }

  // Show first 4 GitHub repositories as buttons
  const projectButtons = document.getElementById('project-buttons');
  if (projectButtons) {
    projectButtons.innerHTML = '<div>Loading projects...</div>';
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await res.json();
      if (Array.isArray(repos) && repos.length > 0) {
        projectButtons.innerHTML = '';
        repos.slice(0, 4).forEach(repo => {
          const a = document.createElement('a');
          a.className = 'project-btn-link';
          a.href = repo.html_url;
          a.target = '_blank';
          a.textContent = repo.name;
          projectButtons.appendChild(a);
        });
      } else {
        projectButtons.innerHTML = '<div>No public projects found.</div>';
      }
    } catch (e) {
      projectButtons.innerHTML = '<div>Error fetching projects.</div>';
    }
  }
}); 