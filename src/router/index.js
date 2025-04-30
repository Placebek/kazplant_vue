import { createRouter, createWebHistory } from 'vue-router'
import FirstSlide from '@/components/slides/FirstSlide.vue'
import Home from '@/pages/HomePage.vue'
import Login from '@/pages/LoginPage.vue'
import Profile from '@/pages/ProfilePage.vue'
import Register from '@/pages/RegisterPage.vue'
import NotFound from '@/pages/NotFoundPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import ScanPage from '@/pages/ScanPage.vue'
import ListPage from '@/pages/ListPage.vue'
import MyPlantsPage from '@/pages/MyPlantsPage.vue'
import PlantDetailsPage from '@/pages/PlantDetailsPage.vue'

const routes = [
	{ path: '/', component: FirstSlide },
	{ path: '/home', component: Home },
	{ path: '/login', component: Login },
	{ path: '/profile', component: Profile },
	{ path: '/register', component: Register },
	{ path: '/:pathMatch(.*)*', component: NotFound },
	{ path: '/search', component: SearchPage },
	{ path: '/scan', component: ScanPage },
	{ path: '/plant', component: ListPage },
	{ path: '/my-plants', component: MyPlantsPage },
	{ path: '/plant/:id', component: PlantDetailsPage },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
