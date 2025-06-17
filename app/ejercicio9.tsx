import React from "react"
import { View } from "react-native"
import EjercicioTemplateMultiple, { InputConfig } from "~/components/activity/EjercicioMultipleTemplate"
import { Text } from "~/components/ui/text"

export default function EjercicioAreaTriangulo() {
    const [base, setBase] = React.useState<string>('')
    const [altura, setAltura] = React.useState<string>('')
    const [area, setArea] = React.useState<number | null>(null)

    const inputs: InputConfig[] = [
        {
            key: 'base',
            placeholder: '10',
            label: 'Base del triángulo:',
            value: base,
            set: setBase
        },
        {
            key: 'altura',
            placeholder: '8',
            label: 'Altura del triángulo:',
            value: altura,
            set: setAltura
        }
    ]

    const calcularArea = () => {
        if (base && altura) {
            const baseNum = parseFloat(base)
            const alturaNum = parseFloat(altura)
            
            if (!isNaN(baseNum) && !isNaN(alturaNum) && baseNum > 0 && alturaNum > 0) {
                const areaCalculada = (baseNum * alturaNum) / 2
                setArea(areaCalculada)
            } else {
                setArea(null)
            }
        }
    }

    React.useEffect(() => {
        calcularArea()
    }, [base, altura])

    return (
        <EjercicioTemplateMultiple
            description="Cree un programa que solicite al usuario la base de un triángulo y su altura, calcule el área del triángulo."
            inputs={inputs}
        >
            <View className=''>
                <Text className='text-center text-lg font-semibold'>
                    {area !== null 
                        ? `El área del triángulo es: ${area}`
                        : 'Ingrese valores válidos para base y altura'
                    }
                </Text>
            </View>
        </EjercicioTemplateMultiple>
    )
}