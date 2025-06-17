import { View } from "react-native"
import React from "react"
import EjercicioTemplateMultiple, { InputConfig } from "~/components/activity/EjercicioMultipleTemplate"
import { Text } from "~/components/ui/text"

export default function Ejercicio6() {
    const [horaActual, setHoraActual] = React.useState<string>('')
    const [cantidadHoras, setCantidadHoras] = React.useState<string>('')
    const [horaFinal, setHoraFinal] = React.useState<number | null>(null)

    const inputs: InputConfig[] = [
        {
            key: 'horaActual',
            placeholder: '3',
            label: 'Hora actual:',
            value: horaActual,
            set: setHoraActual
        },
        {
            key: 'cantidadHoras',
            placeholder: '5', 
            label: 'Cantidad de horas:',
            value: cantidadHoras,
            set: setCantidadHoras
        }
    ]

    const calcularHoraFinal = () => {
        if (horaActual && cantidadHoras) {
            const actual = parseInt(horaActual)
            const cantidad = parseInt(cantidadHoras)
            
            if (!isNaN(actual) && !isNaN(cantidad) && actual >= 0 && actual <= 23 && cantidad >= 0) {
                const final = (actual + cantidad) % 24
                setHoraFinal(final)
            } else {
                setHoraFinal(null)
            }
        }
    }

    React.useEffect(() => {
        calcularHoraFinal()
    }, [horaActual, cantidadHoras])

    return (
        <EjercicioTemplateMultiple
            description="Cree un programa que pregunte al usuario la hora actual t del reloj y un número entero de horas h, que indique qué hora marcará el reloj dentro de h horas."
            inputs={inputs}
        >
            <View className=''>
                <Text className='text-center text-lg font-semibold'>
                    {horaFinal !== null && cantidadHoras
                        ? `En ${cantidadHoras} horas, el reloj marcará las ${horaFinal}`
                        : 'Ingrese valores válidos para la hora'
                    }
                </Text>
            </View>
        </EjercicioTemplateMultiple>
    )
}