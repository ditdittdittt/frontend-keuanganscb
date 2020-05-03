<template>
  <v-container>
    <v-row class="text-center" justify="center" align-content="center" align="center">
      <v-col class="px-0">
        <v-btn fab icon small @click="clear">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
      <v-col class="px-0">
        <v-btn fab icon small @click="save">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-card flat color="white" :light="true">
          <VueSignaturePad id="signature" ref="signaturePad" height="300px" :options="options" />
          <v-overlay :absolute="true" :value="isLoading" :opacity="0.9">
            <v-row justify="center" align="center" class="text-center">
              <v-col>
                <span>{{ $translate('text.convert_to_image', 'capitalize') + '...' }}</span>
              </v-col>
            </v-row>
          </v-overlay>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueSignaturePad from 'vue-signature-pad'

Vue.use(VueSignaturePad)

export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          isEmpty: true,
          data: null
        }
      }
    }
  },
  data() {
    return {
      dialog: false,
      options: {
        penColor: '#000000',
        onBegin: () => {
          this.$refs.signaturePad.resizeCanvas()
        }
      },
      isLoading: false
    }
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    async save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.$emit('input', { isEmpty, data })
      this.isLoading = true
      await this.loading()
    },
    loading() {
      setTimeout(() => (this.isLoading = false), 1000)
    },
    clear() {
      this.$refs.signaturePad.clearSignature()
      this.$emit('input', { isEmpty: true, data: null })
    },
    picker() {
      this.options = {
        penColor: this.color
      }
      this.dialog = false
    }
  }
}
</script>
<style>
#signature {
  border-radius: 8px;
  border: 2px dashed #dddddd;
}
.v-dialog {
  box-shadow: none !important;
}
</style>
