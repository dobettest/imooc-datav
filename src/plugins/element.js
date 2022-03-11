import Vue from 'vue'
import { Button, Card, Row, Col, Menu, MenuItem, RadioGroup, RadioButton, DatePicker } from 'element-ui'
const arr = [Button, Card, Row, Col, Menu, MenuItem, RadioGroup, RadioButton, DatePicker]
for (const item of arr) {
  Vue.use(item)
}
