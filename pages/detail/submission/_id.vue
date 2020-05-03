<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="text-capitalize primary white--text">
                <span>
                  {{ $translate('components.form.title.submission') }}
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
                      @click.stop="
                        $export('pdf', 'submission', $route.params.id)
                      "
                    >
                      <v-list-item-title class="text-capitalize">
                        {{ $translate('export.pdf') }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      @click.stop="
                        $export('excel', 'submission', $route.params.id)
                      "
                    >
                      <v-list-item-title class="text-capitalize">
                        {{ $translate('export.excel') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text>
                <v-row>
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
                      {{ $translate('text.request') }}
                    </div>
                    <v-icon small class="mr-1">mdi-newspaper-plus</v-icon>
                    <span>
                      {{
                        input.form_request.allocation ||
                          $vuetify.lang.t('$vuetify.noDataText')
                      }}
                    </span>
                    <v-btn
                      color="accent"
                      icon
                      x-small
                      :to="'/detail/request/' + input.form_request.id"
                    >
                      <v-icon small>mdi-open-in-new</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.use') }}
                    </div>
                    <div>{{ input.used | currency }}</div>
                    <span class="caption">
                      {{
                        $terbilang(input.used) ||
                          $vuetify.lang.t('$vuetify.noDataText') | capitalize
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.balance') }}
                    </div>
                    <div>{{ input.balance | currency }}</div>
                    <span class="caption">
                      {{
                        $terbilang(input.balance) ||
                          $vuetify.lang.t('$vuetify.noDataText') | capitalize
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <div class="caption primary--text text-capitalize">
                      {{ $translate('text.note') }}
                    </div>
                    <span>
                      {{
                        input.notes || $vuetify.lang.t('$vuetify.noDataText')
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
                      @click="openDialogSureVerify('pic')"
                      >{{ $translate('text.pic') }}</v-btn
                    >
                  </v-col>
                  <v-col v-if="checkVerifyVerificator()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click="openDialogSureVerify('verificator')"
                      >{{ $translate('text.verificator') }}</v-btn
                    >
                  </v-col>
                  <v-col v-if="checkVerifyHeadDept()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click="openDialogSureVerify('headDept')"
                      >{{ $translate('text.head_dept') }}</v-btn
                    >
                  </v-col>
                  <v-col v-if="checkVerifyHeadOffice()" cols="12" md="6">
                    <v-btn
                      large
                      elevation="8"
                      block
                      color="secondary"
                      @click="openDialogSureVerify('headOffice')"
                      >{{ $translate('text.head_office') }}</v-btn
                    >
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
          :to="'/update/submission/' + $route.params.id"
          >{{ $translate('components.button.update') }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-btn block dark elevation="8" x-large color="secondary">
          {{ $translate('components.button.done') }}
        </v-btn>
      </v-col>
    </v-row>
    <snackbar-alert
      v-model="alert"
      :success="success"
      :messages="messages"
    ></snackbar-alert>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogSureDelete" persistent max-width="600">
          <v-card>
            <v-card-title class="title text-capitalize">
              {{ $translate('text.sure_delete_head') }}
            </v-card-title>
            <v-card-text class="overline">
              {{ $translate('text.sure_delete_body') }}
            </v-card-text>
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
                    @click="deleteSubmission()"
                  >
                    {{ $translate('components.button.sure_button_yes') }}
                  </v-btn>
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
            <v-card-title class="title text-capitalize">
              {{ $translate('text.sure_verify_head') }}
            </v-card-title>
            <v-card-text class="overline">
              {{ $translate('text.sure_verify_body') }}
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
                  <v-btn color="secondary" text block @click="verifyAs()">
                    {{ $translate('components.button.sure_button_yes') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>
<script>
export default {
  filters: {
    currency(value) {
      if (value === null || value === '') return 'Rp 0'
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
      messages: '',
      dialogSureDelete: false,
      dialogSureVerify: false,
      input: {
        form_request: {},
        user: {},
        used: '',
        balance: ''
      },
      verifyRole: ''
    }
  },
  mounted() {
    this.getSubmissionForm()
  },
  methods: {
    openDialogSureVerify(role) {
      this.verifyRole = role
      this.dialogSureVerify = true
    },
    closeDialogSureVerify() {
      this.dialogSureVerify = false
    },
    openDialogSureDelete() {
      this.dialogSureDelete = true
    },
    closeDialogSureDelete() {
      this.dialogSureDelete = false
    },
    async getSubmissionForm() {
      try {
        this.input = await this.$api(
          'submission',
          'show',
          this.$route.params.id
        )
      } catch (e) {}
    },
    async deleteSubmission() {
      try {
        await this.$api('submission', 'delete', this.$route.params.id)
        this.closeDialogSureDelete()
        this.$router.replace('/all/submission')
      } catch (e) {}
    },
    checkEditAble() {
      if (
        (this.input.is_confirmed_pic === 0 &&
          this.input.is_confirmed_verificator === 0 &&
          this.input.is_confirmed_head_office === 0 &&
          this.input.is_confirmed_head_dept === 0 &&
          this.input.user_id === this.$auth.user.id) ||
        this.$auth.user.id === 1
      ) {
        return true
      }
      return false
    },
    checkVerifyPic() {
      if (this.input.is_confirmed_pic === 0) {
        return true
      }
    },
    checkVerifyHeadOffice() {
      if (this.input.is_confirmed_head_office === 0) {
        return true
      }
    },
    checkVerifyHeadDept() {
      if (this.input.is_confirmed_head_dept === 0) {
        return true
      }
    },
    checkVerifyVerificator() {
      if (this.input.is_confirmed_verificator === 0) {
        return true
      }
    },
    async verifyAsPic() {
      try {
        await this.$api('submission', 'verifyaspic', this.input)
      } catch (e) {}
    },
    async verifyAsVerificator() {
      try {
        await this.$api('submission', 'verifyasverificator', this.input)
      } catch (e) {}
    },
    async verifyAsHeadOffice() {
      try {
        await this.$api('submission', 'verifyasheadoffice', this.input)
      } catch (e) {}
    },
    async verifyAsHeadDept() {
      try {
        await this.$api('submission', 'verifyasheaddept', this.input)
      } catch (e) {}
    },
    async verifyAs() {
      switch (this.verifyRole) {
        case 'pic':
          await this.verifyAsPic()
          break
        case 'verificator':
          await this.verifyAsVerificator()
          break
        case 'headOffice':
          await this.verifyAsHeadOffice()
          break
        case 'headDept':
          await this.verifyAsHeadDept()
          break
        default:
          this.verifyRole = ''
      }
      this.verifyRole = ''
      await this.getSubmissionForm()
      this.closeDialogSureVerify()
    }
  }
}
</script>
<style scoped></style>
