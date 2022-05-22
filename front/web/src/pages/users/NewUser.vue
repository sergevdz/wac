<template>
  <q-page>
    <div class="q-pa-sm panel-header">
      <div class="row">
        <div class="col-sm-3">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Usuarios" to="/users" />
              <q-breadcrumbs-el label="Nuevo" />
            </q-breadcrumbs>
          </div>
        </div>
      </div>
    </div>

    <content-panel>
      <div class="row q-col-gutter-xs">
        <div class="col-xs-12 col-sm-3">
          <q-input
            color="white"
            bg-color="primary"
            filled
            dark
            v-model="form.fields.email"
            :error="v$.form.fields.email.$error"
            label="E-mail"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-at" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-input
            color="white"
            bg-color="primary"
            filled
            dark
            v-model="form.fields.password"
            :error="v$.form.fields.password.$error"
            label="Contraseña"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-key" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 text-right">
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              color="positive"
              icon="save"
              label="Guardar"
              @click="createUser()"
            />
          </div>
        </div>
      </div>
    </content-panel>
  </q-page>
</template>

<script lang="ts">
import api from 'src/api'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email } from '@vuelidate/validators'
import { $notify } from 'src/commons/utils'
import ApiError from 'src/api/apierror'

export default {
  name: 'NewUser',
  setup: () => ({ v$: useVuelidate() }),
  validations: {
    form: {
      fields: {
        email: { required, maxLength: maxLength(100), email },
        password: { required, maxLength: maxLength(100) }
      }
    }
  },
  data() {
    return {
      form: {
        fields: {
          email: null,
          password: null
        }
      },
      isPwd: true
    }
  },
  methods: {
    async createUser() {
      try {
        this.v$.form.fields.$touch()
        if (this.v$.form.fields.$error) {
          $notify('Por favor revise los campos.', 'warning')
          return false
        }
        this.$q.loading.show()
        const params = { ...this.form.fields }
        const user = await api.users.create(params)
        if (user) {
          $notify('Se ha creado el usuario.', 'positive')
          this.$router.push('/users')
        }
      } catch (e) {
        if (e instanceof ApiError) {
          $notify(e.message, 'negative')
        }
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style></style>
