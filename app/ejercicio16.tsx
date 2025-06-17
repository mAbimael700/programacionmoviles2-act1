import Decimal from 'decimal.js'
import React from 'react'
import { View } from 'react-native'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { Text } from '~/components/ui/text'


export default function ejercicio16() {
    const [centimeter, setCentimeter] = React.useState<string>()
    const [result, setResult] = React.useState<number | null>(null)

    const onCentimeterChange = () => {

        if (centimeter) {
            const value = Number.parseFloat(centimeter)

            if (Number.isNaN(value)) {
                return setResult(null)
            }

            const r = convertToInchs(value)
            setResult(r)
        }
    }

    React.useEffect(() => {
        onCentimeterChange()
    }, [centimeter])

    return (
        <EjercicioTemplate
            description='Cree un programa que permita convertir X pies a N pulgadas.'
            placeholder='Valor en pies'
            inputState={{ set: setCentimeter, value: centimeter }}
        >

            <View>
                <Text className='font-semibold'>Valor en pulgadas</Text>
                {result}
            </View>


        </EjercicioTemplate>
    )
}

function convertToInchs(value: number) {
    return new Decimal(value).times(12).toNumber()
}

