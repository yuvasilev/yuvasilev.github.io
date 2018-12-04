<template>
  <div>

    <div class="form-group">
      <label>
        Имя
        <input
          v-validate="'required|alpha'"
          v-model="user.name"
          type="text"
          class="form-control"
          name="firstName">
      </label>
      <span
        v-show="errors.has('firstName')"
        class="help-block text-danger">
        {{ errors.first('firstName') }}
      </span>
    </div>

    <div class="form-group">
      <label>
        Фамилия
        <input
          v-validate="'required|alpha'"
          v-model="user.surname"
          type="text"
          class="form-control"
          name="lastName">
      </label>
      <span
        v-show="errors.has('lastName')"
        class="help-block text-danger">
        {{ errors.first('lastName') }}
      </span>
    </div>

    <div class="form-group">
      <label>
        Телефон
        <masked-input
          v-validate="'required'"
          v-model="user.phone"
          mask="\+\7 (111) 111-1111"
          type="tel"
          class="form-control"
          name="phone"/>
      </label>
      <span
        v-show="errors.has('phone')"
        class="help-block text-danger">
        {{ errors.first('phone') }}
      </span>
    </div>

    <div class="form-group">
      <label>
        Email
        <input
          v-validate="'required|email'"
          v-model="user.email"
          type="email"
          class="form-control"
          name="email">
      </label>
      <span
        v-show="errors.has('email')"
        class="help-block text-danger">
        {{ errors.first('email') }}
      </span>
    </div>

    <div class="form-group">
      <label>
        Адрес доставки
        <input
          v-validate="'required'"
          v-model="user.address"
          type="text"
          class="form-control"
          name="address">
      </label>
      <span
        v-show="errors.has('address')"
        class="help-block text-danger">
        {{ errors.first('address') }}
      </span>
    </div>

    <div class="form-group">
      <label>
        Комментарий
        <input
          v-model="user.comment"
          type="text"
          class="form-control"
          name="comment">
      </label>
    </div>

    <slot/>
  </div>

</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import MaskedInput from 'vue-masked-input'

const ruValidationMessages = {
  ru: {
    messages: {
      required: 'Это обязательное поле, заполни его!',
      email: 'В поле должен быть email!',
      alpha: 'В поле допустимы только символы алфавита!'
    }
  }
}

Validator.localize(ruValidationMessages)
const validator = new Validator({
  email: 'ru',
  firstName: 'ru',
  phone: 'ru',
  address: 'ru'
})

validator.localize('ru')
Vue.use(VeeValidate)

export default {
  name: 'UserForm',
  inject: ['$validator'],
  components: { MaskedInput },
  model: {
    prop: 'user'
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    localUser: null
  }),
  watch: {
    user: {
      deep: true,
      handler() {
        this.$emit('input', this.user)
      }
    }
  },
  created() {
    this.localUser = Object.assign({}, this.user)
  }
}
</script>
