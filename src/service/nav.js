const home = { path: '/', labelKey: 'nav.home' }
const skills = { path: '/skills', labelKey: 'nav.skills' }
const projects = { path: '/projects', labelKey: 'nav.projects' }
const experience = { path: '/experience', labelKey: 'nav.experience' }

function getNavItems() {
  return [home, skills, projects, experience]
}

export default {
  getNavItems
}
