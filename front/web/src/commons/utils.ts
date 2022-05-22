import { Notify } from 'quasar'

// Crea una notificacíon
const $notify = (message, color = 'positive') => {
  return Notify.create({
    message: message,
    position: 'top',
    color: color
  })
}

// Da formato a un número
const $formatNumber = (number, len = 2) => {
  if (len === 4) {
    const num = Math.round((1 * number + Number.EPSILON) * 10000) / 10000
    return parseFloat(num)
      .toFixed(len)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  }
  return parseFloat((100 * number) / 100)
    .toFixed(len)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

// Restringe a solo escribir enteros
const $lockIntegers = (evt) => {
  if (!evt) {
    evt = window.event
  }
  const charCode = evt.which ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    evt.preventDefault()
  } else {
    return true
  }
}

// Restringe a solo escribir enteros y decimales
const $lockDecimals = (evt) => {
  if (!evt) {
    evt = window.event
  }
  const charCode = evt.which ? evt.which : evt.keyCode
  if (
    charCode > 31 &&
    (charCode < 48 || charCode > 57) &&
    charCode !== 46 &&
    charCode !== 45
  ) {
    evt.preventDefault()
  } else {
    return true
  }
}

// Redondea y devuelve un flotante
const $round = (num, d) => {
  const elevateTo = Number('1e' + d)
  return Math.round((num + Number.EPSILON) * elevateTo) / elevateTo
}

// Personaliza el filtro para una tabla
const $filter = (rows, terms, cols, cellValue) => {
  const lowerTerms = terms ? terms.trim().toLowerCase() : ''
  return rows.filter((row) =>
    cols.some(
      (col) =>
        (cellValue(col, row) + '').trim().toLowerCase().indexOf(lowerTerms) !==
        -1
    )
  )
}

// Obtiene el tipo de cambio actual (USD) desde el DOF
const $getCurrentExchangeRate = async () => {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
  const yyyy = today.getFullYear()
  const currentDate = dd + '-' + mm + '-' + yyyy
  const url = `https://sidofqa.segob.gob.mx/dof/sidof/indicadores/158/${currentDate}/${currentDate}`
  let exRate = 0
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      exRate = data.ListaIndicadores[0].valor || null
    })
  return exRate
}

export {
  $notify,
  $formatNumber,
  $lockIntegers,
  $lockDecimals,
  $round,
  $filter,
  $getCurrentExchangeRate
}
