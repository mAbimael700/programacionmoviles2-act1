import Decimal from 'decimal.js'
import React from 'react'
import { View } from 'react-native'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { Text } from '~/components/ui/text'


export default function ejercicio14() {
    const [centimeter, setCentimeter] = React.useState<string>()
    const [result, setResult] = React.useState<number | null>(null)

    const onCentimeterChange = () => {

        if (centimeter) {
            const value = Number.parseFloat(centimeter)

            if (Number.isNaN(value)) {
                return setResult(null)
            }

            const r = convertToMeters(value)
            setResult(r)
        }
    }

    React.useEffect(() => {
        onCentimeterChange()
    }, [centimeter])

    return (
        <EjercicioTemplate
            description='Cree un programa que permita convertir Convertir X pies a M metros.'
            placeholder='Valor en pies'
            inputState={{ set: setCentimeter, value: centimeter }}
        >

            <View>
                <Text className='font-semibold'>Valor en metros</Text>
                {result}
            </View>


        </EjercicioTemplate>
    )
}

function convertToMeters(value: number) {
    return new Decimal(value).times(0.3048).toNumber()
}

