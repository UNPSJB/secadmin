<template>
  <div class="profile-dropdown-wrapper">
    <va-dropdown v-model="isShown" class="profile-dropdown" stick-to-edges :offset="[13, 0]">
      <template #anchor>
        <span class="profile-dropdown__anchor">
          <slot />
          <va-icon class="px-2" :name="isShown ? 'angle_up' : 'angle_down'" :color="colors.primary" />
        </span>
      </template>
      <va-dropdown-content class="profile-dropdown__content">
        <va-button 
        preset="secondary"
        class="custom-button" 
        @click="onCerrarSesion"> Cerrar sesión </va-button>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useColors } from 'vuestic-ui'
  import { useAuthStore } from '../../../../stores/auth-store'
  import { useRouter } from 'vue-router'
  //import store from '../../../../stores'
  

  const { t } = useI18n()
  const { colors } = useColors()
  const store = useAuthStore();
  const router = useRouter()

  function onCerrarSesion(){
    store.logout();
    router.push('/auth/login' );
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

  .custom-button {
    background: none; /* Elimina cualquier fondo */
    order: none; /* Elimina el borde */
    padding: 0; /* Elimina el relleno del botón */
  }
</style>
