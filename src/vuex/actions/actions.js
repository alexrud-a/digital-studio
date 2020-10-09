export default {
    hidePreload({commit}, val) {
        commit.commit('ISLOAD', val);
    }
}