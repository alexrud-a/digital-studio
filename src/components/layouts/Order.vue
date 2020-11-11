<template>
  <div class="order">
    <form class="form-order contact" method="post" action="mail.php" @submit.prevent="submit">
      <div class="contact__form-control">
        <input class="inp-control" type="text" placeholder="Представьтесь" v-model="name" name="name">
        <div v-if="!message.length" class="message">
          {{ validation.firstError('name') }}
        </div>
      </div>
      <div class="contact__form-control">
        <input class="inp-control" type="tel" placeholder="+7 (___) ___-__-__" v-mask="'+# (###) ###-##-##'" v-model="phone" name="phone">
        <div v-if="!message.length" class="message">
          {{ validation.firstError('phone') }}
        </div>
      </div>
      <div class="contact__form-item">
        <div class="contact__form-control">
          <button class="btn btn--banner" type="submit">
            Заказать
          </button>
        </div>
      </div>
    </form>
    <div class="message-form">
      {{message}}
    </div>
  </div>
</template>

<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;
import axios from "axios";
export default {
mixins: [SimpleVueValidator.mixin],
name: "Order",
  data() {
    return {
      name: '',
      phone: '',
      message: '',
    }
  },
  validators: {
    name: function (value) {
      return Validator.value(value).minLength(3, 'Введите не менее 3 символов');
    },
    phone: function (value) {
      return Validator.value(value).required('Поле обязательно для заполнения').length(18, 'Поле телефон должно содержать 10 цифр');
    },
  },
  methods: {
    loading: function () {
      let self = this;
      self.isLoad = true
    },
    mail: function() {
      let self = this;
      axios({
        method: 'post',
        url: 'mail.php',
        data: {
          name: self.name,
          phone: self.phone,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(function (response) {
        self.message = response.data;
        self.name = '';
        self.phone = '';
      });
    },
    submit: function() {
      let self = this;
      self.$validate()
          .then(function(success) {
            if (success) {
              self.mail();
            }
          });
      },
  },
}
</script>

<style lang="scss">
.order {
  .contact {
    padding: 20px 25px;

    .btn {
      color: $accent-color;
      background-color: transparent;
      box-shadow: none;
      border: 4px solid $accent-color;
      border-radius: 0;
      padding: 10px 20px;
      text-transform: uppercase;
      font-weight: 900;
      letter-spacing: 1px;
      transition: all .3s ease-in-out;

      &--banner {
        background-color: $accent-color;
        color: #fff;
        padding: 10px 20px;

        &:hover {
          background-color: transparent;
          color: $accent-color;
        }
      }
    }
  }
}
</style>