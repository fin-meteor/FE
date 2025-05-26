<template>
  
  <landingView/>
</template>

<script>
import landingView from '@/views/main/MainView.vue'
export default {
  name: "Frame",
};
</script>

<style>
.frame {
  border-radius: 6.67px;
  height: 104px;
  overflow: hidden;
  position: relative;
  width: 181px;
}

.frame .overlap-group {
  background-image: url(./image-1754.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 133px;
  left: -9px;
  position: relative;
  top: -15px;
  width: 200px;
}

.frame .div-wrapper {
  align-items: center;
  background-color: #00000080;
  border-radius: 6.67px;
  display: flex;
  gap: 6.67px;
  height: 104px;
  justify-content: center;
  left: 9px;
  overflow: hidden;
  padding: 39.33px 66.67px;
  position: relative;
  top: 15px;
  width: 181px;
}

.frame .text-wrapper {
  color: var(--collection-1-white-duplicate);
  font-family: "Pretendard-Medium", Helvetica;
  font-size: 18.7px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: normal;
  margin-left: -8.50px;
  margin-right: -8.50px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}
</style>