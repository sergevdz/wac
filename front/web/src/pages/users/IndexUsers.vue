<template>
  <q-page class="bg-grey-3">
    <div class="q-pa-sm panel-header">
      <div class="row">
        <div class="col-sm-8">
          <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs align="left" style="font-size: 20px">
              <q-breadcrumbs-el label="" icon="home" to="/" />
              <q-breadcrumbs-el label="Usuarios" />
            </q-breadcrumbs>
          </div>
        </div>
        <div class="col-xs-6 col-md-4 text-right">
          <div class="q-pa-sm q-gutter-sm">
            <q-btn
              class="bg-primary"
              style="color: white"
              icon="add"
              label="Nuevo"
              @click="$router.push('/users/new')"
            />
          </div>
        </div>
      </div>
    </div>
    <content-panel>
      <q-table
        flat
        bordered
        :rows="table.data"
        :columns="table.columns"
        row-key="id"
        :pagination="table.pagination"
      >
        <template v-slot:top>
          <div style="width: 100%">
            <q-input
              dense
              debounce="300"
              v-model="table.filter"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="email"
              style="text-align: left; width: 20%"
              :props="props"
              >{{ props.row.email }}</q-td
            >
            <!-- <q-td key="nickname" style="text-align: left; width: 30%;" :props="props">{{ props.row.nickname }}</q-td> -->
            <!-- <q-td key="roles" style="text-align: left; width: 40%;" :props="props">{{ props.row.roles }}</q-td> -->
            <q-td key="actions" style="width: 10%" :props="props">
              <q-btn
                color="primary"
                icon="fas fa-edit"
                flat
                @click="editSelectedRow(props.row.id)"
                size="10px"
              >
                <q-tooltip content-class="bg-primary">Editar</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </content-panel>
  </q-page>
</template>

<script lang="ts">
import api from 'src/api'
import table from 'src/commons/table'

const columns = [
  {
    name: 'email',
    align: 'center',
    label: 'EMAIL',
    field: 'email',
    style: 'width: 20%',
    sortable: true
  },
  // { name: 'nickname', align: 'center', label: 'NICKNAME', field: 'nickname', style: 'width: 30%', sortable: true },
  // { name: 'roles', align: 'center', label: 'ROLES', field: 'roles', style: 'width: 40%', sortable: true },
  {
    name: 'actions',
    align: 'center',
    label: 'ACCIONES',
    field: 'actions',
    style: 'width: 10%',
    sortable: false
  }
]

export default {
  name: 'IndexUsers',
  data () {
    return {
      table: {
        ...table,
        columns: columns
      }
    }
  },
  created () {
    this.fetchFromServer()
  },
  mounted () {
    // Mounted
  },
  methods: {
    async fetchFromServer() {
      this.$q.loading.show()
      const users = await api.users.getAll() || []
      this.table.data = users
      this.$q.loading.hide()
    },
    editSelectedRow(id: int) {
      this.$router.push('/users/' + id)
    }
  }
}
</script>

<style></style>
