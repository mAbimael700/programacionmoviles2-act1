import Decimal from 'decimal.js'
import React from 'react'
import { View } from 'react-native'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { Text } from '~/components/ui/text'


export default function ejercicio11() {
    const [centimeter, setCentimeter] = React.useState<string>()
    const [result, setResult] = React.useState<number | null>(null)

    const onCentimeterChange = () => {

        if (centimeter) {
            const value = Number.parseFloat(centimeter)

            if (Number.isNaN(value)) {
                return setResult(null)
            }

            const r = convertToLibs(value)
            setResult(r)
        }
    }

    React.useEffect(() => {
        onCentimeterChange()
    }, [centimeter])

    return (
        <EjercicioTemplate
            description='Cree un programa que permita convertir kilogramos a libras'
            placeholder='Valor en kilogramos'
            inputState={{ set: setCentimeter, value: centimeter }}
        >

            <View>
                <Text className='font-semibold'>Valor en libras</Text>
                {result}
            </View>


        </EjercicioTemplate>
    )
}

function convertToLibs(value: number) {
    return new Decimal(value).times(2.2).toNumber()
}

