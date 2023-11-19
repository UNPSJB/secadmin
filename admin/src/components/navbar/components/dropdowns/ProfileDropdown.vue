<template>
  <div class="profile-dropdown-wrapper">
    <va-dropdown v-model="isShown" class="profile-dropdown" stick-to-edges :offset="[13, 0]">
      <template #anchor>
        <span class="profile-dropdown__anchor">
          <va-icon class="px-2" :name="isShown ? 'angle_up' : 'angle_down'" :color="colors.primary" />
        </span>
      </template>
      <va-dropdown-content class="profile-dropdown__content">
        <va-button preset="plain" class="cerrar-sesion-button" @click="onCerrarSesion"> Cerrar sesión </va-button>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useColors } from 'vuestic-ui'
  import { useAuthStore } from '../../../../stores/auth-store'
  import { useRouter } from 'vue-router'

  const { colors } = useColors()
  const store = useAuthStore()
  const router = useRouter()

  function onCerrarSesion() {
    store.logout()
    router.push('auth/login')
  }

  withDefaults(
    defineProps<{
      options?: { name: string; redirectTo: string }[]
    }>(),
    {
      options: () => [
        {
          name: 'profile',
          redirectTo: '',
        },
        {
          name: 'logout',
          redirectTo: 'login',
        },
      ],
    },
  )

  const isShown = ref(false)
</script>

<style lang="scss" scoped>
  .profile-dropdown {
    cursor: pointer;

    &__anchor {
      display: inline-block;
    }

    &__item {
      display: block;
      color: var(--va-gray);

      &:hover,
      &:active {
        color: var(--va-primary);
      }
    }
  }

  .cerrar-sesion-button {
    margin: 10px 20px;
  }
</style>
