<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>
                  {{ $translate('components.form.title.petty_cash') }}
                </span>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      @click.stop="$export('pdf', 'petty', $route.params.id)"
                    >
                      <v-list-item-title class="text-capitalize">
                        {{ $translate('export.pdf') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.number') }}
                    </div>
                    <span>
                      {{
                        input.number ||
                          $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.allocation') }}
                    </div>
                    <span>
                      {{
                        input.allocation ||
                          $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.amount') }}
                    </div>
                    <span>{{ input.amount | currency }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.status') }}
                    </div>
                    <span>
                      {{
                        input.status.status ||
                          $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div class="caption primary--text text-capitalize">
                  {{ $translate('text.verification') }}
                </div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-col v-if="checkVerifyPic()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('pic')"
                      >{{ $translate('text.pic') }}</v-btn
                    >
                  </v-col>
                  <v-col v-if="checkVerifyManagerOps()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('managerOps')"
                      >{{ $translate('text.manager_ops') }}</v-btn
                    >
                  </v-col>
                  <v-col v-if="checkVerifyCashier()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('cashier')"
                      >{{ $translate('text.cashier') }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div class="caption primary--text text-capitalize">
                  {{ $translate('text.budget') }}
                </div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-data-table
                    :items="input.details"
                    :headers="headers"
                  ></v-data-table>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                {{ $translate('text.pic') }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.name') }}
                    </div>
                    <span>{{ input.user.name }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.division') }}
                    </div>
                    <span>{{ input.user.division }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.email') }}
                    </div>
                    <span>{{ input.user.email }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-date-picker :value="input.date"></v-date-picker>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="spacing-small"></div>
    <v-row v-if="checkEditAble()">
      <v-col>
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="openDialogSureDelete()"
          >{{ $translate('components.button.delete') }}</v-btn
        >
      </v-col>
      <v-col v-if="checkEditAble()">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="secondary"
          :to="'/update/petty/' + $route.params.id"
          >{{ $translate('components.button.update') }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-if="checkStatus()">
      <v-col>
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="secondary"
          @click.stop="openDialogSureVerify('alreadyPaid')"
          >{{ $translate('components.button.already_paid') }}</v-btn
        >
      </v-col>
    </v-row>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureDelete" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">{{
              $translate('text.sure_delete_head')
            }}</v-card-title>
            <v-card-text class="overline">{{
              $translate('text.sure_delete_body')
            }}</v-card-text>
            <v-card-actions>
              <v-row class="mx-0">
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="accent"
                    text
                    block
                    @click="closeDialogSureDelete()"
                    >{{ $translate('components.button.sure_button_no') }}</v-btn
                  >
                </v-col>
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="secondary"
                    text
                    block
                    @click="deletePettyCash()"
                    >{{
                      $translate('components.button.sure_button_yes')
                    }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureVerify" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">{{
              $translate('text.sure_verify_head')
            }}</v-card-title>
            <v-card-text class="overline">{{
              $translate('text.sure_verify_body')
            }}</v-card-text>
            <v-card-text>
              <signature-pad :key="key" v-model="signature"></signature-pad>
            </v-card-text>
            <v-card-text>
              <v-container class="text-center">
                <span v-if="signature.isEmpty">Belum ada tanda tangan</span>
                <span v-else>Tanda tangan siap disimpan</span>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-row class="mx-0">
                <v-col class="px-0" cols="6">
                  <v-btn
                    color="accent"
                    text
                    block
                    @click="closeDialogSureVerify()"
                    >{{ $translate('components.button.sure_button_no') }}</v-btn
                  >
                </v-col>
                <v-col class="px-0" cols="6">
                  <v-btn color="secondary" text block @click="verifyAs()">{{
                    $translate('components.button.sure_button_yes')
                  }}</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
  </v-container>
</template>
<script>
import SignaturePad from '~/components/SignaturePad.vue'
export default {
  components: {
    SignaturePad
  },
  filters: {
    currency(value) {
      if (value == null || value === '') return 'Rp 0'
      const result = Number(value)
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result
    },
    capitalize(value) {
      if (!value) return ''
      value = value
        .toString()
        .split(' ')
        .map((element) => element.charAt(0).toUpperCase() + element.slice(1))
      return value.join(' ')
    }
  },
  data() {
    return {
      alert: false,
      success: false,
      dialogSureDelete: false,
      dialogSureVerify: false,
      messages: '',
      headers: [
        {
          text: `${this.$translate('text.budget_code', 'capitalize')}`,
          value: 'budget_code.code'
        },
        {
          text: `${this.$translate('text.budget_name', 'capitalize')}`,
          value: 'budget_code.name'
        },
        {
          text: `${this.$translate('text.budget_nominal', 'capitalize')}`,
          value: 'nominal'
        }
      ],
      input: {
        details: [],
        status: {},
        user: {},
        signature: {}
      },
      verifyRole: '',
      signature: {
        isEmpty: true,
        data: null
      },
      key: 0
    }
  },
  mounted() {
    this.getPettyCashForm()
  },
  methods: {
    openDialogSureVerify(role) {
      this.verifyRole = role
      this.dialogSureVerify = true
      this.signature.isEmpty = true
      this.signature.data = null
      this.rerender()
    },
    closeDialogSureVerify() {
      this.dialogSureVerify = false
      this.signature.isEmpty = true
      this.signature.data = null
    },
    openDialogSureDelete() {
      this.dialogSureDelete = true
    },
    closeDialogSureDelete() {
      this.dialogSureDelete = false
    },
    rerender() {
      this.key++
    },
    async getPettyCashForm() {
      try {
        this.input = await this.$api('petty', 'show', this.$route.params.id)
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async deletePettyCash() {
      try {
        await this.$api('petty', 'delete', this.$route.params.id)
        this.closeDialogSureDelete()
        this.$router.replace('/all/petty')
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    checkEditAble() {
      if (
        (this.input.is_confirmed_pic === 0 &&
          this.input.is_confirmed_manager_ops === 0 &&
          this.input.is_confirmed_cashier === 0 &&
          this.input.user_id === this.$auth.user.id) ||
        this.$auth.user.id === 1
      ) {
        return true
      }
      return false
    },
    async verifyAsPic() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('petty', 'verifyaspic', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAsManagerOps() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('petty', 'verifyasmanagerops', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAsCashier() {
      if (this.signature.isEmpty === true || this.signature == null) {
        this.success = false
        this.messages = 'Gagal karena tidak ada tanda tangan'
        this.alert = true
      } else {
        try {
          this.input.signature = this.$copy(this.signature)
          await this.$api('petty', 'verifyascashier', this.input)
        } catch (e) {
          this.success = false
          this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
          this.alert = true
        }
      }
    },
    async verifyAlreadyPaid() {
      try {
        await this.$api('petty', 'verifyalreadypaid', this.input)
      } catch (e) {
        this.success = false
        this.messages = 'Terjadi kesalahan : ' + e.toString().slice(0, 10)
        this.alert = true
      }
    },
    async verifyAs() {
      switch (this.verifyRole) {
        case 'pic':
          await this.verifyAsPic()
          break
        case 'managerOps':
          await this.verifyAsManagerOps()
          break
        case 'cashier':
          await this.verifyAsCashier()
          break
        case 'alreadyPaid':
          await this.verifyAlreadyPaid()
          break
        default:
          this.verifyRole = ''
      }
      this.verifyRole = ''
      await this.getPettyCashForm()
      this.closeDialogSureVerify()
    },
    checkVerifyPic() {
      if (this.input.is_confirmed_pic === 0) {
        return true
      }
    },
    checkVerifyCashier() {
      if (this.input.is_confirmed_cashier === 0) {
        return true
      }
    },
    checkVerifyManagerOps() {
      if (this.input.is_confirmed_manager_ops === 0) {
        return true
      }
    },
    checkStatus() {
      if (this.input.status_id === 2) {
        return true
      }
    }
  }
}
</script>
<style scoped></style>
