<template>
  <div class="section">
    <div class="form-contact">
      <InputField class="input-field-instance" divClassName="design-component-instance-node" label="ID" state="default"
        value="Value" valueType="placeholder" />
      <InputField class="input-field-instance" divClassName="design-component-instance-node" label="비밀번호"
        state="default" value="Value" valueType="placeholder" />
      <InputField class="input-field-instance" divClassName="design-component-instance-node" label="이름" state="default"
        value="Value" valueType="placeholder" />
      <InputField class="input-field-instance" divClassName="design-component-instance-node" label="닉네임" state="default"
        value="Value" valueType="placeholder" />
      <InputField class="input-field-instance" divClassName="design-component-instance-node" label="프로필 사진"
        state="default" value="+ 이미지 업로드" valueType="placeholder" />
      <ButtonGroup align="justify" buttonLabel="회원가입" buttonStart="false" buttonVariantPrimaryClassName="button-group-2"
        class="btn btn-danger" />
      <ButtonGroup align="justify" buttonLabel="깃허브로 시작하기" buttonStart="false" buttonVariantPrimaryClassName="button-group-2"
        class="button-group-instance" />

    </div>
  </div>
</template>

<script>
import InputField from './acoounts/InputField.vue';
import ButtonGroup from './acoounts/ButtonGroup.vue';

export default {
  name: 'Section',
  components: {
    InputField,
    ButtonGroup
  }
};
</script>

<style>
.button-group-instance {
  /* Child objects in a smart layout frame */
border-radius: 8px;
opacity: 1;
background: #FF5833;
box-sizing: border-box;
border: 0px solid #0969DA;

}

.section {
  align-items: center;
  background-image: url(./section.png);
  background-position: 50% 50%;
  background-size: cover;
  display: flex;
  gap: 10px;
  height: 835px;
  padding: 217px 200px;
  position: relative;
}

.section .form-contact {
  align-items: flex-start;
  background-color: var(--color-background-default-default);
  border-color: var(--color-border-default-default);
  border-radius: var(--size-radius-200);
  display: flex;
  flex-direction: column;
  gap: var(--size-space-600);
  margin-bottom: -110.50px;
  margin-top: -110.50px;
  padding: var(--size-space-600);
  position: relative;
  width: 441px;
}

.section .input-field-instance {
  align-self: stretch !important;
  display: flex !important;
  flex: 0 0 auto !important;
  width: 100% !important;
}

.section .design-component-instance-node {
  color: var(--variable-collection-white) !important;
}

.section .button-group-instance {
  align-self: stretch !important;
  flex: 0 0 auto !important;
  width: 100% !important;
}

.section .button-group-2 {
  background-color: var(--variable-collection-point) !important;
  border-color: var(--variable-collection-blue) !important;
  display: flex !important;
  flex: 1 !important;
  flex-grow: 1 !important;
}

.section .deferred-side-panel {
  align-items: center;
  align-self: stretch;
  background-color: var(--variable-collection-white);
  border: 1.56px solid;
  border-color: #d1d9e0;
  border-radius: 8px;
  display: flex;
  gap: 6.25px;
  height: 40px;
  justify-content: center;
  padding: 0px 31.25px 0px 25px;
  position: relative;
  width: 100%;
}

.section .link-homepage {
  align-items: flex-start;
  border-radius: 8749.12px;
  display: flex;
  flex-direction: column;
  height: 28px;
  position: relative;
  width: 28px;
}

.section .SVG {
  height: 28px;
  position: relative;
  width: 28px;
}

.section .div {
  color: var(--variable-collection);
  font-family: "Pretendard Variable-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 25.6px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}
</style>
