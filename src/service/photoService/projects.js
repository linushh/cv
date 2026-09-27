import todoCover from '@/assets/imgTodo/AttGöra.png'
import sunbotCover from '@/assets/imgSunbotJs/sunbot-commands.png'

import todoImages from '@/service/photoService/todoGallery.js'
import sunbotImages from '@/service/photoService/sunbotGallery.js'
import github from '@/service/photoService/github.js'
import sunbotGithub from '@/service/photoService/sunbotjsGithub.js'

const todoLinks = github.getProjects()
const sunbotLink = sunbotGithub.getProject()

const projects = [
  {
    id: 'todo',
    titleKey: 'projects.todoTitle',
    cover: todoCover,
    images: todoImages,
    frontend: todoLinks.todoFrontend,
    backend: todoLinks.todoBackend,
    frontendNameKey: 'projects.todoFrontendName',
    backendNameKey: 'projects.todoBackendName'
  },
  {
    id: 'sunbot',
    titleKey: 'projects.sunbotTitle',
    cover: sunbotCover,
    images: sunbotImages,
    frontend: null,
    backend: sunbotLink.sunbotJs,
    frontendNameKey: null,
    backendNameKey: 'projects.sunbotBackendName'
  }
]

function getProjects() {
  return projects
}

export default {
  getProjects
}
