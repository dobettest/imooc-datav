import Vue from 'vue'
import { Button, Card, Row, Col, Menu, MenuItem, RadioGroup, RadioButton, DatePicker, Table, TableColumn, Pagination } from 'element-ui'
const arr = [Button, Card, Row, Col, Menu, MenuItem, RadioGroup, RadioButton, DatePicker, Table, TableColumn, Pagination]
for (const item of arr) {
  Vue.use(item)
}
