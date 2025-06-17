import Decimal from 'decimal.js'
import React from 'react'
import { View } from 'react-native'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { Text } from '~/components/ui/text'


export default function ejercicio18() {
    const [centimeter, setCentimeter] = React.useState<string>()
    const [result, setResult] = React.useState<number | null>(null)

    const onCentimeterChange = () => {

        if (centimeter) {
            const value = Number.parseFloat(centimeter)

            if (Number.isNaN(value)) {
                return setResult(null)
            }

            const r = convertToFarenheit(value)
            setResult(r)
        }
    }

    React.useEffect(() => {
        onCentimeterChange()
    }, [centimeter])

    return (
        <EjercicioTemplate
            description='Cree un programa que permita convertir grados centígrados a grados Fahrenheit.'
            placeholder='Valor en grados centigrados'
            inputState={{ set: setCentimeter, value: centimeter }}
        >

            <View>
                <Text className='font-semibold'>Valor en grados Fahrenheit</Text>
                {result}
            </View>


        </EjercicioTemplate>
    )
}

function convertToFarenheit(value: number) {
    return new Decimal(value).times(1.8).plus(32).toNumber()
}

