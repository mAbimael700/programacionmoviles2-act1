import React from 'react'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { convertToInch } from '~/lib/actividad4/fn'

export default function ejercicio3() {
  const [centimeter, setCentimeter] = React.useState<string>()
  const [result, setResult] = React.useState<number | undefined>()

  const onCentimeterChange = () => {

    if (centimeter) {
      const value = Number.parseFloat(centimeter)

      if (Number.isNaN(value)) {
        return setResult(undefined)
      }

      const inchs = convertToInch(value)
      setResult(inchs)
    }
  }

  React.useEffect(() => {
    onCentimeterChange()
  }, [centimeter])

  return (
    <EjercicioTemplate
      description='Cree un programa que convierta de centímetros a pulgadas'
      placeholder='Valor en centrímetros'
      inputState={{ set: setCentimeter, value: centimeter }}
    >
      {result}
    </EjercicioTemplate>
  )
}
