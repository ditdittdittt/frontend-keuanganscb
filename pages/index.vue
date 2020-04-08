<template>
  <v-container>
    <!-- First Row -->
    <v-row justify="space-between">
      <!-- First Column -->
      <v-col
        lg="6"
        md="6"
        cols="12"
      >
        <v-card
          class="rounded white--text"
          img="https://images.unsplash.com/photo-1511629091441-ee46146481b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        >
          <v-card-subtitle
            class="white--text font-weight-bold text-uppercase"
          >
            {{ timestamp }}
          </v-card-subtitle>
          <v-card-title
            class="font-weight-medium display-1"
          >
            Hi, {{ this.$auth.user.name }}
          </v-card-title>

          <v-card-text
            class="white--text"
          >
            Bismillah Guys
          </v-card-text>

          <v-card-actions
            class="pa-5"
          >
            <v-icon
              class="deep-orange--text"
            >
              mdi-plus-circle
            </v-icon>
            <p
              class="ma-0 px-3 font-weight-bold overline"
            >
              BUAT ORDER BARU
            </p>
          </v-card-actions>

        </v-card>

      </v-col>

      <!-- Second Column -->
      <v-col
        lg="2"
        md="2"
        cols="6"
      >
        <v-card
          class="rounded white--text orange-grad"
          height="100%"
        >
          <v-card-title
            class="text-justify font-weight-light"
          >
            <p>Request Form</p>
          </v-card-title>
          <v-card-text
            class="display-3 white--text font-weight-black"
          >
            {{ countFormRequest }}
          </v-card-text>
          <v-card-actions
            class="pa-5"
          >
            <p class="ma-0">Total</p>
            <v-spacer></v-spacer>
            <v-icon
              class="white--text"
            >
              mdi-cart-outline
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Third Column -->
      <v-col
        lg="2"
        md="2"
        cols="6"
      >
        <v-card
          class="rounded white--text purple-grad"
          height="100%"
        >
          <v-card-title
            class="text-justify font-weight-light"
          >
            <p>Submission Form</p>
          </v-card-title>
          <v-card-text
            class="display-3 white--text font-weight-black"
          >
            {{ countFormSubmission }}
          </v-card-text>
          <v-card-actions
            class="pa-5"
          >
            <p class="ma-0">Total</p>
            <v-spacer></v-spacer>
            <v-icon
              class="white--text"
            >
              mdi-calendar-month-outline
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Fourth Column -->
      <v-col
        lg="2"
        md="2"
        sm="12"
        cols="12"
      >
        <v-card
          class="rounded white--text blue-grad"
          height="100%"
        >
          <v-card-title
            class="text-justify font-weight-light"
          >
            <p>Petty Cash</p>
          </v-card-title>
          <v-card-text
            class="display-3 white--text font-weight-black"
          >
            {{ countFormPettyCash }}
          </v-card-text>
          <v-card-actions
            class="pa-5"
          >
            <p class="ma-0">Total</p>
            <v-spacer></v-spacer>
            <v-icon
              class="white--text"
            >
              mdi-format-list-bulleted
            </v-icon>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

<!--    &lt;!&ndash; Second Row &ndash;&gt;-->
<!--    <v-row justify="space-between">-->
<!--      <v-col-->
<!--        xl="8"-->
<!--        md="8"-->
<!--        sm="12"-->
<!--        cols="12"-->
<!--      >-->
<!--        <v-row>-->
<!--          <v-col><h6 class="pl-2 caption font-weight-bold text-uppercase">Pembayaran Terakhir</h6></v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-col>-->
<!--            <v-card-->
<!--              class="rounded"-->
<!--            >-->
<!--              <v-card-title class="caption">PO-K19000016 <v-spacer/> <span class="red&#45;&#45;text font-weight-bold">Belum Lunas</span></v-card-title>-->
<!--              <v-card-text>-->
<!--                <h6 class="body-2 black&#45;&#45;text font-weight-medium">Nominal SO</h6>-->
<!--                <h6 class="green&#45;&#45;text font-weight-bold display-1 pb-2">Rp. 1.000.000</h6>-->
<!--                <h6 class="body-2 black&#45;&#45;text font-weight-medium">Dana Tertunda</h6>-->
<!--                <h6 class="font-weight-bold headline">Rp. 1.000.000</h6>-->
<!--              </v-card-text>-->
<!--              <v-card-actions>-->
<!--                <v-icon small>mdi-clock-outline</v-icon>-->
<!--                <span class="pl-2 pr-2 caption font-weight-bold">2019-10-02</span>-->
<!--                <v-spacer/>-->
<!--                <v-btn-->
<!--                  text-->
<!--                  color="blue"-->
<!--                  class="caption font-weight-bold"-->
<!--                >-->
<!--                  Lihat SO-->
<!--                </v-btn>-->
<!--              </v-card-actions>-->
<!--            </v-card>-->
<!--          </v-col>-->

<!--          <v-col>-->
<!--            <v-card-->
<!--              class="rounded"-->
<!--            >-->
<!--              <v-card-title class="caption">PO-K19000016 <v-spacer/> <span class="red&#45;&#45;text font-weight-bold">Belum Lunas</span></v-card-title>-->
<!--              <v-card-text>-->
<!--                <h6 class="body-2 black&#45;&#45;text font-weight-medium">Nominal SO</h6>-->
<!--                <h6 class="green&#45;&#45;text font-weight-bold display-1 pb-2">Rp. 1.000.000</h6>-->
<!--                <h6 class="body-2 black&#45;&#45;text font-weight-medium">Dana Tertunda</h6>-->
<!--                <h6 class="font-weight-bold headline">Rp. 1.000.000</h6>-->
<!--              </v-card-text>-->
<!--              <v-card-actions>-->
<!--                <v-icon small>mdi-clock-outline</v-icon>-->
<!--                <span class="pl-2 pr-2 caption font-weight-bold">2019-10-02</span>-->
<!--                <v-spacer/>-->
<!--                <v-btn-->
<!--                  text-->
<!--                  color="blue"-->
<!--                  class="caption font-weight-bold"-->
<!--                >-->
<!--                  Lihat SO-->
<!--                </v-btn>-->
<!--              </v-card-actions>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-col>-->

<!--      <v-col-->
<!--        xl="4"-->
<!--        md="4"-->
<!--        sm="12"-->
<!--        cols="12"-->
<!--      >-->
<!--        <v-row>-->
<!--          <v-col><h6 class="pl-2 caption font-weight-bold text-uppercase">Total Pembayaran</h6></v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-col>-->
<!--            <v-card class="grad-pink rounded" height="240px">-->
<!--              <v-card-subtitle class="pa-5caption white&#45;&#45;text text-uppercase font-weight-medium">Keuntungan minggu ini</v-card-subtitle>-->
<!--              <v-card-text class="pa-5 white&#45;&#45;text font-weight-bold display-1">Rp. 121.000.000</v-card-text>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-col>-->

<!--    </v-row>-->

<!--    &lt;!&ndash; Third Row &ndash;&gt;-->
<!--    <v-row>-->
<!--      <v-col cols="12">-->
<!--        <h6 class="pl-2 caption font-weight-bold text-uppercase">Penjualan Terbaru</h6>-->
<!--      </v-col>-->
<!--      <v-col cols="12">-->
<!--        <v-data-table-->
<!--          :headers="headers"-->
<!--          :items="items"-->
<!--          :hide-default-footer="true"-->
<!--          disable-pagination-->
<!--          class="elevation-1 rounded-table"-->
<!--        >-->
<!--          <template v-slot:item.id="{}">-->
<!--            <v-btn-->
<!--              text-->
<!--              small-->
<!--              color="primary"-->
<!--            >-->
<!--              Lihat Histori-->
<!--            </v-btn>-->
<!--          </template>-->

<!--        </v-data-table>-->
<!--      </v-col>-->
<!--    </v-row>-->

  </v-container>
</template>

<script>

  export default {
    data () {
      return {
        countFormRequest: '',
        countFormSubmission: '',
        countFormPettyCash: '',
        title:"Dashboard",
        timestamp: "",
        headers: [
          {
            text: 'Nomor SO',
            align: 'left',
            value: 'nomor',
          },
          { text: 'Tanggal SO', value: 'tanggal' },
          { text: 'Nama Konsumen', value: 'nama' },
          { text: 'Jenis SO', value: 'jenis' },
          { text: 'Status', value: 'status' },
          {
            text: 'Histori',
            value:'id',
            align: 'center',
            sortable: false
          },
        ],
        items: [
          {
            nomor: 'SO-D19000016',
            tanggal: '2019-10-02',
            nama: 'Kedai Sayur',
            jenis: 'Pembelian Umum',
            status: 'Baru',
            id: 1,
          },
          {
            nomor: 'SO-D19000016',
            tanggal: '2019-10-02',
            nama: 'Kedai Sayur',
            jenis: 'Pembelian Umum',
            status: 'Dinego',
            id : 2,
          },
          {
            nomor: 'SO-D19000016',
            tanggal: '2019-10-02',
            nama: 'Kedai Sayur',
            jenis: 'Pembelian Umum',
            status: 'Draft',
            id : 3,
          },
          {
            nomor: 'SO-D19000016',
            tanggal: '2019-10-02',
            nama: 'Hotel Kembar',
            jenis: 'Pembelian Umum',
            status: 'Baru',
            id: 4,
          },
        ],
      }
    },
    methods: {
      getNow: function() {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date +' '+ time;
        this.timestamp = dateTime;
      },
      async getCountEveryForm() {
        await this.$axios.$get('/form/request/count')
        .then((response) => {
          console.log(response)
          this.countFormRequest = response.jumlah_request_form
        })
        await this.$axios.$get('/form/submission/count')
        .then((response) => {
          this.countFormSubmission = response.jumlah_submission_form
        })
        await this.$axios.$get('/form/petty-cash/count')
        .then((response) => {
          this.countFormPettyCash = response.jumlah_petty_cash_form
        })
      }
    },
    mounted(){
      this.$store.commit('setCurrentPageTitle', this.title)
      this.getCountEveryForm()
      setInterval(this.getNow, 1000);

    },
    created() {
    }
  }
</script>

<style scoped>
  .rounded {
    border-radius: 20px !important;
  }
  .orange-grad {
    background: linear-gradient(90deg, rgba(255,110,80,1) 0%, rgba(235,61,96,1) 100%);
  }
  .purple-grad {
    background: linear-gradient(90deg, rgba(101,61,235,1) 0%, rgba(128,8,181,1) 100%);
  }
  .blue-grad {
    background: linear-gradient(90deg, rgba(61,181,235,1) 0%, rgba(8,108,181,1) 100%);
  }
</style>
