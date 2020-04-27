<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>{{ $translate('components.form.title.request') }}</span>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="text-capitalize">{{ $translate('export.pdf') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="text-capitalize">{{ $translate('export.excel') }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.allocation')}}</div>
                    <span>{{ input.allocation || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.payment_type')}}</div>
                    <v-chip
                      label
                      small
                      class="overline"
                    >{{ input.method || $vuetify.lang.t('$vuetify.noDataText') }}</v-chip>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.amount')}}</div>
                    <div>{{ input.amount | currency }}</div>
                    <span
                      class="caption"
                    >{{ $terbilang(input.amount) || $vuetify.lang.t('$vuetify.noDataText') | capitalize }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.attachment">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.file')}}</div>
                    <span class="text-capitalize">{{ $translate('text.view') }}</span>
                    <v-btn color="accent" icon x-small :href="input.attachment" target="_blank">
                      <v-icon small>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.note')}}</div>
                    <span>{{ input.notes || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div class="caption primary--text text-capitalize"
                    >{{ $translate('text.bank_code')}}</div>
                    <span>{{ input.bank_code || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.bank_name')}}</div>
                    <span>{{ input.bank_name || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.account_number')}}</div>
                    <span>{{ input.account_number || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12" md="6" v-if="input.method==='Transfer'">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.account_owner')}}</div>
                    <span>{{ input.account_owner || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                  <v-col cols="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.status')}}</div>
                    <span>{{ input.status.status || $vuetify.lang.t('$vuetify.noDataText') }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <div
                  class="caption primary--text text-capitalize"
                >{{ $translate('text.verification')}}</div>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-col cols="12" md="6" v-if="checkVerifyPic()">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('pic')"
                    >{{ $translate('text.pic')}}</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" v-if="checkVerifyVerifcator()">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('verificator')"
                    >{{ $translate('text.verificator')}}</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" v-if="checkVerifyHeadDept()">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('headDept')"
                    >{{ $translate('text.head_dept')}}</v-btn>
                  </v-col>
                  <v-col cols="12" md="6" v-if="checkVerifyCashier()">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click.stop="openDialogSureVerify('cashier')"
                    >{{ $translate('text.cashier')}}</v-btn>
                  </v-col>
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
              <v-card-title class="text-capitalize primary white--text">{{ $translate('text.pic') }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="12">
                    <div class="caption primary--text text-capitalize">{{ $translate('text.name')}}</div>
                    <span>{{ input.user.name }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.division')}}</div>
                    <span>{{ input.user.division }}</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="caption primary--text text-capitalize"
                    >{{ $translate('text.email')}}</div>
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
    <v-row>
      <v-col v-if="checkEditAble()">
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="accent"
          @click.stop="openDialogSureDelete()"
        >{{$translate('components.button.delete')}}</v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          dark
          elevation="8"
          x-large
          color="secondary"
        >{{$translate('components.button.done')}}</v-btn>
      </v-col>
    </v-row>
    <snackbar-alert v-model="alert" :success="success" :messages="messages"></snackbar-alert>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureDelete" persistent max-width="290">
          <v-card>
            <v-card-title class="headline text-capitalize">{{ $translate('text.sure_delete_head') | capitalize}} </v-card-title>
            <v-card-text class="text-capitalize">{{ $translate('text.sure_delete_body') | capitalize}} </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDialogSureDelete()">{{ $translate('components.button.sure_button_no') }}</v-btn>
              <v-btn color="green darken-1" text @click="deleteRequest()">{{ $translate('components.button.sure_button_yes') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureVerify" persistent max-width="290">
          <v-card>
            <v-card-title class="headline text-capitalize">{{ $translate('text.sure_verify_head') | capitalize}} </v-card-title>
            <v-card-text class="text-capitalize">{{ $translate('text.sure_verify_body') | capitalize}} </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDialogSureVerify()">{{ $translate('components.button.sure_button_no') }}</v-btn>
              <v-btn color="green darken-1" text @click="verifyAs()">{{ $translate('components.button.sure_button_yes') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      alert: false,
      success: false,
      dialogSureDelete: false,
      dialogSureVerify: false,
      messages: '',
      input: {
        user: {},
        status: {},
        budget_code: {}
      },
      verifyRole: '',
    }
  },
  filters: {
    currency: function(value) {
      if (value == null || value == '') return 'Rp 0'
      const result = Number(value)
        .toString()
        .match(/\d{1,3}(?=(\d{3})*$)/g)
        .join('.')
      return 'Rp ' + result + ',00'
    },
    capitalize: function(value) {
      if (!value) return ''
      value = value
        .toString()
        .split(' ')
        .map(element => element.charAt(0).toUpperCase() + element.slice(1))
      return value.join(' ')
    }
  },
  methods: {
    openDialogSureVerify(role) {
      this.verifyRole = role
      this.dialogSureVerify = true
    },
    closeDialogSureVerify() {
      this.dialogSureVerify = false
    },
    openDialogSureDelete () {
      this.dialogSureDelete = true
    },
    closeDialogSureDelete () {
      this.dialogSureDelete = false
    },
    async getRequestForm() {
      try {
        this.input = await this.$api('request', 'show', this.$route.params.id)
      } catch (e) {
        console.error(e)
      }
    },
    async deleteRequest() {
      try {
        await this.$api('request', 'delete', this.$route.params.id)
        this.closeDialogSureDelete()
        this.$router.replace('/all/request')
      } catch (e) {
        console.error(e)
      }
    },
    checkEditAble() {
      if (
        (
          this.input.is_confirmed_pic === 0 &&
          this.input.is_confirmed_verificator === 0 &&
          this.input.is_confirmed_cashier === 0 &&
          this.input.is_confirmed_head_dept === 0 &&
          this.input.user_id === this.$auth.user.id) ||
        this.$auth.user.id === 1
      ) {
        return true
      }
    },
    async verifyAsPic() {
      try {
        await this.$api('request', 'verifyaspic', this.input)
      } catch (e) {
        console.error(e)
      }
    },
    async verifyAsVerificator() {
      try {
        await this.$api('request', 'verifyasverificator', this.input)
      } catch (e) {
        console.error(e)
      }
    },
    async verifyAsCashier() {
      try {
        await this.$api('request', 'verifyascashier', this.input)
      } catch (e) {
        console.error(e)
      }
    },
    async verifyAsHeadDept() {
      try {
        await this.$api('request', 'verifyasheaddept', this.input)
      } catch (e) {
        console.error(e)
      }
    },
    async verifyAs () {
      switch (this.verifyRole) {
        case 'pic':
          await this.verifyAsPic()
          this.closeDialogSureVerify()
          break
        case 'verificator':
          await this.verifyAsVerificator()
          this.closeDialogSureVerify()
          break
        case 'cashier':
          await this.verifyAsCashier()
          this.closeDialogSureVerify()
          break
        case 'headDept':
          await this.verifyAsHeadDept()
          this.closeDialogSureVerify()
          break
        default:
          this.verifyRole = ''
      }
      this.verifyRole = ''
      this.getRequestForm()
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
    checkVerifyHeadDept() {
      if (this.input.is_confirmed_head_dept === 0) {
        return true
      }
    },
    checkVerifyVerifcator(){
      if (this.input.is_confirmed_verification === 0) {
        return true
      }
    },
  },
  mounted() {
    this.getRequestForm()
  }
}
</script>
<style scoped></style>
