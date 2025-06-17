import Decimal from 'decimal.js'
import React from 'react'
import { View } from 'react-native'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { Text } from '~/components/ui/text'

interface TimeResult {
  decades: number;
  lustros: number;
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
}

export default function ejercicio7() {
  const [age, setAge] = React.useState<string>()
  const [result, setResult] = React.useState<TimeResult>({
    decades: 0,
    lustros: 0,
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0
  })

  const onAgeChange = () => {
    if (age) {
      const value = Number.parseFloat(age)

      if (Number.isNaN(value) || value < 0) {
        return setResult({
          decades: 0,
          lustros: 0,
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0
        })
      }

      const timeCalculations = calculateTimeLived(value)
      setResult(timeCalculations)
    }
  }

  React.useEffect(() => {
    onAgeChange()
  }, [age])

  return (
    <EjercicioTemplate
      description='Cree un programa que muestre que solicite al usuario su edad y el programa le muestre las decadas, lustros, años, meses, semanas, días, horas y minutos vividos'
      placeholder='Ingrese el número de Años'
      inputState={{ set: setAge, value: age }}
    >
      <View style={{ gap: 8 }}>
        <View>
          <Text className='font-semibold'>Décadas: {result.decades}</Text>
        </View>
        <View>
          <Text className='font-semibold'>Lustros: {result.lustros}</Text>
        </View>
        <View>
          <Text className='font-semibold'>Años: {result.years}</Text>
        </View>
        <View>
          <Text className='font-semibold'>Meses: {result.months}</Text>
        </View>
        <View>
          <Text className='font-semibold'>Semanas: {result.weeks}</Text>
        </View>
        <View>
          <Text className='font-semibold'>Días: {result.days}</Text>
        </View>
        <View>
          <Text className='font-semibold'>Horas: {result.hours}</Text>
        </View>
        <View>
          <Text className='font-semibold'>Minutos: {result.minutes}</Text>
        </View>
      </View>
    </EjercicioTemplate>
  )
}

function calculateTimeLived(years: number): TimeResult {
  // Usando Decimal.js para mayor precisión en los cálculos
  const yearsDecimal = new Decimal(years)
  
  // Décadas (1 década = 10 años)
  const decades = Math.floor(yearsDecimal.dividedBy(10).toNumber())
  
  // Lustros (1 lustro = 5 años)
  const lustros = Math.floor(yearsDecimal.dividedBy(5).toNumber())
  
  // Años (tal como se ingresó)
  const yearsResult = yearsDecimal.toNumber()
  
  // Meses (1 año = 12 meses)
  const months = yearsDecimal.times(12).toNumber()
  
  // Semanas (1 año = 52.17857 semanas aproximadamente, pero usaremos 52 como en el ejemplo)
  const weeks = yearsDecimal.times(52).toNumber()
  
  // Días (1 año = 365 días aproximadamente)
  const days = yearsDecimal.times(365).toNumber()
  
  // Horas (1 día = 24 horas)
  const hours = yearsDecimal.times(365).times(24).toNumber()
  
  // Minutos (1 hora = 60 minutos)
  const minutes = yearsDecimal.times(365).times(24).times(60).toNumber()
  
  return {
    decades,
    lustros,
    years: yearsResult,
    months,
    weeks,
    days,
    hours,
    minutes
  }
}