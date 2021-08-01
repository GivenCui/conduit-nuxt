import Vue from 'vue'
import dayjs from 'dayjs'

// 使用方式 {{ 表达式 | date }}
Vue.filter('date', (value, format = 'YYYY-MM-DD') => {
    return dayjs(value).format(format)
})