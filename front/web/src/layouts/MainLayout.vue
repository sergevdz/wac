<template>
  <q-layout view="hHh lpr lfr">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>
          <q-btn-dropdown
            class="color-white"
            flat
            :label="email"
            style="margin-right: 10%"
          >
            <q-list>
              <!-- <q-item clickable v-close-popup @click="openProfile()">
                <q-item-section>
                  <q-item-label>Perfil</q-item-label>
                </q-item-section>
              </q-item> -->
              <q-item clickable v-close-popup @click="logOut">
                <q-item-section>
                  <q-item-label>Cerrar sesión</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="256"
      :breakpoint="512"
    >
      <q-list class="rounded-borders">
        <q-item clickable to="/dashboard" v-ripple>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-separator /> -->
        <q-expansion-item expand-separator label="Sistema">
          <q-item to="/users">
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Usuarios</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item expand-separator label="Essential Links">
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
// import { useRouter } from 'vue-router'
// import { useAuthStore } from 'stores/use-auth-store'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)
    // const userProfile = $store.getters['users/user']
    // const { getUser } = useAuthStore()

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logOut() {
        localStorage.removeItem('jwt')
        location.reload()
      }
      // getUser: getUser
    }
  }
})
</script>
