import { type App } from "vue";
import router from '../router'
import vuetify from '../plugins/vuetify';
import { createPinia } from 'pinia'

const usePlugins = (app:App) => {
    app.use(router)
    app.use(vuetify);
    app.use(createPinia())
}

export default usePlugins; 