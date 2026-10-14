const home = { path: '/', labelKey: 'nav.home', icon: 'fa-solid fa-house' }
const skills = { path: '/skills', labelKey: 'nav.skills', icon: 'fa-solid fa-gears' }
const projects = { path: '/projects', labelKey: 'nav.projects', icon: 'fa-solid fa-folder-open' }
const experience = { path: '/experience', labelKey: 'nav.experience', icon: 'fa-solid fa-briefcase' }

function getNavItems() {
  return [home, skills, projects, experience]
}

export default {
  getNavItems
}
