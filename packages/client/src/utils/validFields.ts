export const ValidateFields = (
  fieldName: string,
  value: string
): null | string => {
  //console.log('FIELD PROPERTY ', fieldName, value);
  let error: null | string = null;
  switch (fieldName) {
    case 'login':
      if (!/^[a-zA-Z-_\d]{3,20}$/.test(value) || /^\d+$/.test(value)) {
        // от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
        // без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
        error = 'Некорректный логин';
      }

      break;
    case 'oldPassword':
    case 'newPassword':
    case 'password': {
      if (
        !/^(.){8,40}$/.test(value) ||
        !/[A-ZА-Я]/.test(value) ||
        !/[\d]/.test(value)
      ) {
        // от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра
        error = 'Некорректный пароль';
      }
      break;
    }
    case 'display_name':
    case 'first_name':
    case 'second_name': {
      if (!/^[A-ZА-Я][a-zа-я-]+$/.test(value)) {
        // латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр,
        // нет спецсимволов (допустим только дефис)
        error = 'Некорректное значение';
      }
      break;
    }
    case 'email': {
      if (!/^[A-Za-z-_\d]+@[A-Za-z]+\.[A-Za-z]+$/.test(value)) {
        // латиница, может включать цифры и спецсимволы вроде дефиса,
        // обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы
        error = 'Некорректный email';
      }
      break;
    }
    case 'phone': {
      if (!/(\+)?[\d]{10,15}$/.test(value)) {
        // от 10 до 15 символов, состоит из цифр, может начинается с плюса
        error = 'Некорректный номер телефона';
      }
      break;
    }
    default:
      break;
  }
  return error

};




export function validformData(values:{[index: string]:string}) {
  let err = null;
  if(Object.keys(values).length!==0){
    for (const key in values) {
      console.log(key, values[key])
      const error = ValidateFields(key, values[key]);

      if (error !== null) {
        err = error;
      }
      if (key === 'newPassword') {
        if (values[key] !== values.oldPassword) {
          err = 'старый и новый пароли не совпадают';
        }
      }
    }
  }
  return err
}