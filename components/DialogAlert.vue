<template>
  <v-dialog v-model="value" max-width="600" persistent scrollable>
    <v-card>
      <v-card-title class="title text-capitalize">
        <span>{{ title }} </span>
        <v-spacer></v-spacer>
        <template v-if="!load">
          <v-btn fab elevation="0" dark x-small color="red" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-card-title>
      <v-card-text class="overline">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <template v-if="!load">
          <v-row class="mx-0">
            <v-col class="px-0" cols="6">
              <v-btn color="accent" text block @click="ifNo">{{
                $translate('components.button.sure_button_no')
              }}</v-btn>
            </v-col>
            <v-col class="px-0" cols="6">
              <v-btn color="secondary" text block @click.stop="ifYes">
                {{ $translate('components.button.sure_button_yes') }}
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <slot>
            <v-row class="mx-0">
              <v-col class="px-0" cols="6">
                <div class="text-center overline">Please wait...</div>
              </v-col>
            </v-row>
          </slot>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogAlert',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    load: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    ifNo() {
      this.$emit('no')
    },
    ifYes() {
      this.$emit('yes')
    }
  }
}
</script>
