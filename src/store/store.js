import { createStore } from "vuex"
import { postModule } from "./modulePosts"

const store = createStore({
    modules: {
        post: postModule
    }
})

export default store