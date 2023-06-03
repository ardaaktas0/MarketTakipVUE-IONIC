<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Kripto Para Verileri</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="coin in filteredCoins" :key="coin.id">
          <ion-label>
            <h2>{{ coin.name }}</h2>
            <p>Fiyat: {{ coin.price }}</p>
            <p>Piyasa Değeri: {{ coin.marketCap }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';

interface CoinData {
  id: string;
  name: string;
  price: number;
  marketCap: number;
}

export default defineComponent({
  name: 'CryptoData',
  components: { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar },
  data() {
    return {
      coins: [] as CoinData[],
      filteredCoins: [] as CoinData[],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
          },
        });

        this.coins = response.data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          price: coin.current_price,
          marketCap: coin.market_cap,
        }));

        this.filteredCoins = [...this.coins];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  watch: {
    coins() {
      this.filteredCoins = [...this.coins];
    },
  },
  computed: {
    filteredCoins() {
      return this.filteredCoins.sort((a, b) => a.price - b.price);
    },
  },
});
</script>