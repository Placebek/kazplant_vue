<template>
  <div
    class="bg-[#0B9C51] min-h-screen min-w-screen flex items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center relative">
      <!-- Внешний большой логотип -->
      <div>
        <svg
          width="138"
          height="138"
          viewBox="0 0 138 138"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M137.72 0.44043V27.9304H130.72V7.44043H105.62V0.44043H137.72Z"
            fill="white"
          />
          <path
            d="M32.4301 0.44043V7.44043H7.32007V27.9304H0.320068V0.44043H32.4301Z"
            fill="white"
          />
          <path
            d="M32.4301 130.84V137.84H0.320068V110.36H7.32007V130.84H32.4301Z"
            fill="white"
          />
          <path
            d="M137.72 110.36V137.84H105.62V130.84H130.72V110.36H137.72Z"
            fill="white"
          />
        </svg>
      </div>

      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="66"
          height="100"
          viewBox="0 0 66 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.4799 28.6002C34.8731 34.8712 33.4653 42.1675 34.4799 49.3302C34.0999 49.6902 33.7099 50.0235 33.3099 50.3302C33.2199 50.2502 33.1299 50.1802 33.0399 50.0902C33.9581 43.0683 32.5532 35.9389 29.0399 29.7902C27.2274 26.62 24.8987 23.7743 22.1499 21.3702C23.176 13.3249 27.1704 5.95308 33.3499 0.700195C39.4148 5.87618 43.3653 13.101 44.4499 21.0002C42.0937 23.2231 40.0816 25.7846 38.4799 28.6002Z"
            fill="white"
          />
          <path
            d="M57.2101 40.5904C53.1582 47.6972 46.578 53.017 38.7801 55.4904C37.5273 55.8977 36.2518 56.2316 34.9601 56.4904C34.51 55.251 34.136 53.9853 33.8401 52.7004C33.6401 51.8004 33.4701 50.9004 33.3401 49.9904C32.1663 41.6854 34.2398 33.2476 39.129 26.4324C44.0183 19.6173 51.3468 14.9496 59.5901 13.4004C61.1839 17.8349 61.7965 22.5624 61.3856 27.2567C60.9747 31.951 59.5501 36.5002 57.2101 40.5904Z"
            fill="#F4F4F4"
          />
          <path
            d="M33.05 49.5203C32.7457 51.8839 32.1857 54.2075 31.38 56.4503C30.0861 56.1868 28.8076 55.853 27.55 55.4503C23.3712 54.1189 19.5036 51.9587 16.1785 49.0988C12.8533 46.2389 10.1389 42.738 8.19728 38.8054C6.25569 34.8727 5.12684 30.589 4.87817 26.2102C4.62951 21.8315 5.26614 17.4475 6.75002 13.3203C14.9159 14.8618 22.1851 19.4627 27.0731 26.1832C31.961 32.9037 34.0989 41.2367 33.05 49.4803V49.5203Z"
            fill="#F4F4F4"
          />
          <path
            d="M57.51 99.54H8.51003L0.620028 54.66C0.080028 51.58 2.68002 48.79 6.10002 48.79H59.94C63.35 48.79 65.94 51.58 65.42 54.66L57.51 99.54Z"
            fill="white"
          />
        </svg>
      </div>

      <div class="absolute top-8 z-50">
        <svg height="120" width="120">
          <line class="loader-pointer" x1="60" y1="60" x2="60" y2="48.498" />
          <line class="loader-line" x1="60" y1="60" x2="67.5" y2="60" />
          <circle class="loader-circle" cx="60" cy="60" r="15" />
          <circle class="loader-center" cx="60" cy="60" r="2.502" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

svg {
  animation: upDown 1s ease-in-out infinite;
}

.loader-circle{
      fill: none;
  stroke-width: 5px;
  stroke: rgb(255, 255, 255);
}

.loader-pointer,
.loader-line {
  fill: none;
  stroke-width: 3px;
  stroke: #0B9C51;
}

.loader-center {
  fill: #0B9C51;
}

.loader-pointer {
  transform-origin: bottom center;
  animation: spin 4s linear infinite;
}

.loader-line {
  transform-origin: bottom center;
  animation: spin 60s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
    transform-origin: 50% 50%;
  }
  to {
    transform: rotate(360deg);
    transform-origin: 50% 50%;
  }
}

@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>