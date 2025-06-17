import Decimal from 'decimal.js'
import React from 'react'
import { View } from 'react-native'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { Text } from '~/components/ui/text'


export default function ejercicio8() {
  const [centimeter, setCentimeter] = React.useState<string>()
  const [result, setResult] = React.useState<any>({
    area: null,
    perimeter: null
  })

  const onCentimeterChange = () => {

    if (centimeter) {
      const value = Number.parseFloat(centimeter)

      if (Number.isNaN(value)) {
        return setResult({
          area: null,
          perimeter: null
        })
      }

      const area = calculateSquareArea(value)
      const perimeter = calculateSquarePerimeter(value)
      setResult({ area, perimeter })
    }
  }

  React.useEffect(() => {
    onCentimeterChange()
  }, [centimeter])

  return (
    <EjercicioTemplate
      description='Cree un programa que solicite al usuario el valor de un lado de un cuadrado, y calcule el área y el perímetro de un cuadrado'
      placeholder='Valor'
      inputState={{ set: setCentimeter, value: centimeter }}
    >

      <View>
        <Text className='font-semibold'>El área del cuadrado es:</Text>
        {result.area}
      </View>
      <View>
        <Text className='font-semibold' >El perímetro del cuadrado es:</Text>
        {result.perimeter}
      </View>

    </EjercicioTemplate>
  )
}
function calculateSquareArea(value: number) {
  return new Decimal(value).times(value).toNumber();
}

function calculateSquarePerimeter(value: number) {
  return new Decimal(value).times(4).toNumber();
}

